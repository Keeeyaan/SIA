from fastapi import APIRouter, status
from bson import ObjectId

from src.models.knowledge_base import KnowledgeBase

kbs = APIRouter()

@kbs.get('/', status_code=status.HTTP_200_OK)
async def get_knowledge_base():
    knowledge_base = await KnowledgeBase.find_all().to_list()
    return knowledge_base

@kbs.post('/', status_code=status.HTTP_201_CREATED, response_model=KnowledgeBase)
async def post_knowledge_base(data: KnowledgeBase):
    await data.create()
    return data

@kbs.put('/{id}', status_code=status.HTTP_200_OK)
async def update_knowledge_base(id: str, data: KnowledgeBase):
    test = await KnowledgeBase.find_one(KnowledgeBase.id == ObjectId(id))

    test.intents = data.intents
    test.version = data.version
    test.updatedAt = data.updatedAt

    await test.save()

    return {"message": "Knowledge Base updated successfully"}

@kbs.delete('/{id}', status_code=status.HTTP_200_OK)
async def delete_knowledge_base(id: str):
    await KnowledgeBase.find_one(KnowledgeBase.id == ObjectId(id)).delete()
    return {"message": "Knowledge Base deleted successfully"}