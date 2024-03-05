from fastapi import APIRouter, status, HTTPException, Depends
from fastapi.security import HTTPAuthorizationCredentials
from bson import ObjectId
from typing import List

from src.models.knowledge_base import KnowledgeBase
from src.utils import get_current_user

kbs = APIRouter()

def not_found(information: str, obj: KnowledgeBase):
  if obj is None:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail=f"{information} not found"
    )

@kbs.get('/', status_code=status.HTTP_200_OK)
async def get_knowledge_bases(current_user: HTTPAuthorizationCredentials = Depends(get_current_user)) -> List[KnowledgeBase]:
  knowledge_base = await KnowledgeBase.find_all().to_list()
  return knowledge_base

@kbs.post('/', status_code=status.HTTP_201_CREATED, response_model=KnowledgeBase)
async def post_knowledge_base(data: KnowledgeBase, current_user: HTTPAuthorizationCredentials = Depends(get_current_user)) -> KnowledgeBase:
  await data.insert()
  return data

@kbs.patch('/{id}', status_code=status.HTTP_200_OK)
async def update_knowledge_base(id: str, data: dict, current_user: HTTPAuthorizationCredentials = Depends(get_current_user)) -> object:
  knowledge_base = await KnowledgeBase.find_one(KnowledgeBase.id == ObjectId(id))

  not_found("Knowledge Base", knowledge_base)

  for field, value in data.items():
    setattr(knowledge_base,field,value)

  await knowledge_base.save()

  return {"detail": "Knowledge Base updated successfully"}

@kbs.delete('/{id}', status_code=status.HTTP_200_OK)
async def delete_knowledge_base(id: str, current_user: HTTPAuthorizationCredentials = Depends(get_current_user)) -> object:
  knowledge_base = await KnowledgeBase.find_one(KnowledgeBase.id == ObjectId(id))

  not_found("Knowledge Base", knowledge_base)

  await knowledge_base.delete()

  return {"detail": "Knowledge Base deleted successfully"}