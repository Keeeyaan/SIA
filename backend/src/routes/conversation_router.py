from fastapi import APIRouter, status, Depends
from fastapi.security import HTTPAuthorizationCredentials
from bson import ObjectId

from src.models.conversation import Conversation, Sequence
from src.models.intent import Intent
from src.utils.user import get_current_user

from src.utils.model import load_model, chatbot_respond
from src.utils.train import init

from datetime import datetime

conversation = APIRouter()

@conversation.get('/', status_code=status.HTTP_200_OK)
async def get_all_conversations(current_user: HTTPAuthorizationCredentials = Depends(get_current_user)) -> Conversation:
    conversations = await Conversation.find_all().to_list()
    return conversations


@conversation.get('/{token}', status_code=status.HTTP_200_OK)
async def get_conversation(token: str):
    conversation = await Conversation.find_one(Conversation.token == token)
    return conversation


@conversation.post('/', status_code=status.HTTP_201_CREATED, response_model=Conversation)
async def post_conversation(data: Conversation) -> Conversation:
    await data.create()
    return data


@conversation.patch('/', status_code=status.HTTP_200_OK)
async def update_conversation(data: dict, current_user: HTTPAuthorizationCredentials = Depends(get_current_user)):
    conversation = await Conversation.find_one(Conversation.token == current_user.get('token'))
    intents = await Intent.find_all().to_list()

    initial = init({'intents': intents})
    model = load_model(
        data.get('filename'),
        data.get('extension')
    )
    response = chatbot_respond(
        data.get('inquiry'),
        model,
        initial.get('tokenizer'),
        initial.get('input_shape'),
        initial.get('label_encoder'),
        initial.get('responses')
    )

    conversation.sequence.append(
        Sequence(
            inquiry=data.get('inquiry'),
            response=response,
            createdAt=datetime.now()
        )
    )

    await conversation.save()

    return {'detail': conversation}


@conversation.delete('/{id}', status_code=status.HTTP_200_OK)
async def delete_conversation(id: str, current_user: HTTPAuthorizationCredentials = Depends(get_current_user)) -> object:
    await Conversation.find_one(Conversation.id == ObjectId(id)).delete()
    return {"message": "Conversation deleted successfully"}
