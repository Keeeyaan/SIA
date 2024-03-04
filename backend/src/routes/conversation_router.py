from fastapi import APIRouter, status
from bson import ObjectId

from src.models.conversation import Conversation

conversation = APIRouter()

@conversation.get('/', status_code=status.HTTP_200_OK)
async def get_conversations() -> Conversation:
    conversations = await Conversation.find_all().to_list()
    return conversations

@conversation.post('/', status_code=status.HTTP_201_CREATED, response_model=Conversation)
async def post_conversation(data: Conversation) -> Conversation:
    await data.create()
    return data

@conversation.delete('/{id}', status_code=status.HTTP_200_OK)
async def delete_conversation(id: str) -> object:
    await Conversation.find_one(Conversation.id == ObjectId(id)).delete()
    return {"message": "Conversation deleted successfully"}