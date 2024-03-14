from fastapi import APIRouter, status, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials
from bson import ObjectId

from src.models.conversation import Conversation, Sequence, UpdateConversation, PostConversation
from src.models.intent import Intent
from src.utils.user import get_current_user, create_access_token
from src.utils.user import ACCESS_TOKEN_EXPIRES_WEEKS

from src.utils.model import load_model, chatbot_respond
from src.utils.train import init

from datetime import datetime, timedelta
from uuid import uuid4

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
async def post_conversation(sequence: PostConversation) -> Conversation:
    access_token_expires = timedelta(weeks=int(ACCESS_TOKEN_EXPIRES_WEEKS))
    
    token = create_access_token(
        {"sub": str(uuid4())},
        expires_delta=access_token_expires
    )

    intents = await Intent.find_all().to_list()

    initial = init({'intents': intents})

    try:
      model = load_model(
        sequence.filename,
        sequence.extension
      )

      response = chatbot_respond(
          sequence.inquiry,
          model,
          initial.get('tokenizer'),
          initial.get('input_shape'),
          initial.get('label_encoder'),
          initial.get('responses')
      )

      data = Conversation(
          token=token,
          sequence=[Sequence(
              inquiry=sequence.inquiry,
              response=response,
              createdAt=datetime.now()
          )]
      )

      await data.create()

      return data
    except:
      raise HTTPException(
          status_code=400,
          detail="Please use the latest version of the model."
      )


@conversation.patch('/', status_code=status.HTTP_200_OK)
async def update_conversation(data: UpdateConversation) -> dict:
    conversation = await Conversation.find_one(Conversation.token == data.token)
    intents = await Intent.find_all().to_list()

    initial = init({'intents': intents})

    try:
      model = load_model(
          data.filename,
          data.extension
      )

      response = chatbot_respond(
          data.inquiry,
          model,
          initial.get('tokenizer'),
          initial.get('input_shape'),
          initial.get('label_encoder'),
          initial.get('responses')
      )

      conversation.sequence.append(
        Sequence(
            inquiry=data.inquiry,
            response=response,
            createdAt=datetime.now()
        )
      )

      await conversation.save()

      return {'detail': conversation}
    except:
      raise HTTPException(
          status_code=400,
          detail="Please use the latest version of the model."
      )



@conversation.delete('/{id}', status_code=status.HTTP_200_OK)
async def delete_conversation(id: str, current_user: HTTPAuthorizationCredentials = Depends(get_current_user)) -> dict:
    await Conversation.find_one(Conversation.id == ObjectId(id)).delete()
    return {"detail": "Conversation deleted successfully"}
