from fastapi import APIRouter, status, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials
from bson import ObjectId
from typing import List

from src.models.knowledge_base import KnowledgeBase
from src.models.inquiry import Inquiry
from src.models.intent import Intent
from src.models.conversation import Conversation, Sequence, UpdateConversation, PostConversation
from src.models.knowledge_base import KnowledgeBase
from src.utils.user import get_current_user, not_found

from src.utils.model import load_model, chatbot_respond, get_models
from src.utils.train import init

from datetime import datetime
from uuid import uuid4

conversation = APIRouter()


@conversation.get('/', status_code=status.HTTP_200_OK)
async def get_all_conversations(current_user: HTTPAuthorizationCredentials = Depends(get_current_user)) -> List[Conversation]:
    conversations = await Conversation.find_all().to_list()
    return conversations


@conversation.get('/{token}', status_code=status.HTTP_200_OK)
async def get_conversation(token: str) -> Conversation:
    conversation = await Conversation.find_one(Conversation.token == token)

    not_found("Conversation", conversation)

    return conversation


@conversation.post('/', status_code=status.HTTP_201_CREATED, response_model=Conversation)
async def post_conversation(data: PostConversation) -> Conversation:
    token = str(uuid4())

    try:
        models = get_models()
        if len(models) <= 0:
            raise HTTPException(
                status_code=503,
                detail="I'm sorry, it seems that I was not able to process your request properly. There seems to be an issue with the system at the moment, which is preventing me from processing your request. Please try asking again later? Thank you."
            )

        kbs = await KnowledgeBase.find_one(KnowledgeBase.version == ''.join(models[0].split('_')[1]))

        initial = init({"intents": kbs.intents})

        model = load_model(kbs.version)

        response = chatbot_respond(
            data.inquiry,
            model,
            initial.get('tokenizer'),
            initial.get('input_shape'),
            initial.get('label_encoder'),
            initial.get('responses'),
            {"intents": kbs.intents}
        )

        conversation = Conversation(
            token=token,
            sequence=[Sequence(
                inquiry=data.inquiry,
                response=response.get("response"),
                createdAt=datetime.now()
            )]
        )

        await conversation.create()
        inquiry = Inquiry(token=token, inquiry=data.inquiry,
                          tag=response.get("tag"), version=kbs.version)
        await inquiry.insert()

        intent = await Intent.find_one(Intent.tag == response.get("tag"))
        intent.frequency = intent.frequency + 1
        await intent.save()

        return conversation

    except:
        raise HTTPException(
            status_code=503,
            detail="I'm sorry, it seems that I was not able to process your request properly. There seems to be an issue with the system at the moment, which is preventing me from processing your request. Please try asking again later? Thank you."
        )


@conversation.patch('/', status_code=status.HTTP_200_OK)
async def update_conversation(data: UpdateConversation) -> dict:
    conversation = await Conversation.find_one(Conversation.token == data.token)

    try:
        models = get_models()
        if len(models) <= 0:
            raise HTTPException(
                status_code=503,
                detail="I'm sorry, it seems that I was not able to process your request properly. There seems to be an issue with the system at the moment, which is preventing me from processing your request. Please try asking again later? Thank you."
            )

        kbs = await KnowledgeBase.find_one(KnowledgeBase.version == ''.join(models[0].split('_')[1]))

        initial = init({'intents': kbs.intents})

        model = load_model(kbs.version)

        response = chatbot_respond(
            data.inquiry,
            model,
            initial.get('tokenizer'),
            initial.get('input_shape'),
            initial.get('label_encoder'),
            initial.get('responses'),
            {"intents": kbs.intents}
        )

        conversation.sequence.append(
            Sequence(
                inquiry=data.inquiry,
                response=response.get("response"),
                createdAt=datetime.now()
            )
        )

        await conversation.save()
        inquiry = Inquiry(token=data.token, inquiry=data.inquiry,
                          tag=response.get("tag"), version=kbs.version)
        await inquiry.insert()

        intent = await Intent.find_one(Intent.tag == response.get("tag"))
        intent.frequency = intent.frequency + 1
        await intent.save()

        return {"detail": conversation}
    except:
        raise HTTPException(
            status_code=503,
            detail="I'm sorry, it seems that I was not able to process your request properly. There seems to be an issue with the system at the moment, which is preventing me from processing your request. Could you please try asking again? Thank you."
        )


@conversation.delete('/{id}', status_code=status.HTTP_200_OK)
async def delete_conversation(id: str, current_user: HTTPAuthorizationCredentials = Depends(get_current_user)) -> dict:
    conversation = await Conversation.find_one(Conversation.id == ObjectId(id))

    not_found("Conversation", conversation)

    await conversation.delete()

    return {"detail": "Conversation deleted successfully", "deleted_conversation": conversation}
