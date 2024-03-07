from fastapi import APIRouter, status, Depends
from fastapi.security import HTTPAuthorizationCredentials
from bson import ObjectId

from src.models.conversation import Conversation
from src.utils.user import get_current_user

conversation = APIRouter()


@conversation.get('/', status_code=status.HTTP_200_OK)
async def get_conversations(current_user: HTTPAuthorizationCredentials = Depends(get_current_user)) -> Conversation:
    conversations = await Conversation.find_all().to_list()
    return conversations


@conversation.post('/', status_code=status.HTTP_201_CREATED, response_model=Conversation)
async def post_conversation(data: Conversation, current_user: HTTPAuthorizationCredentials = Depends(get_current_user)) -> Conversation:
    await data.create()
    return data


@conversation.delete('/{id}', status_code=status.HTTP_200_OK)
async def delete_conversation(id: str, current_user: HTTPAuthorizationCredentials = Depends(get_current_user)) -> object:
    await Conversation.find_one(Conversation.id == ObjectId(id)).delete()
    return {"message": "Conversation deleted successfully"}
