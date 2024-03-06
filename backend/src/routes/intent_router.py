from fastapi import APIRouter, status, HTTPException, Depends
from fastapi.security import HTTPAuthorizationCredentials
from pydantic import BaseModel

from src.models.intent import Intent
from src.utils import get_current_user

intent = APIRouter()

class Pattern(BaseModel):
  pattern: str

class Response(BaseModel):
  response: str

@intent.get('/', status_code=status.HTTP_200_OK)
async def get_all_intents(current_user: HTTPAuthorizationCredentials = Depends(get_current_user)):
  intent = await Intent.find_all().to_list()
  return intent

@intent.get('/{tag}/', status_code=status.HTTP_200_OK)
async def get_all_patterns_and_responses_by_tag(tag: str, current_user: HTTPAuthorizationCredentials = Depends(get_current_user)):
  intent = await Intent.find_one(Intent.tag == tag)
  return {"patterns": intent.patterns, "responses": intent.responses}

@intent.post('/', status_code=status.HTTP_201_CREATED)
async def create_intent(intent: Intent, current_user: HTTPAuthorizationCredentials = Depends(get_current_user)):
  await intent.create()
  return {"detail": "Intent created successfully!"}

@intent.post("/pattern/{tag}/", status_code=status.HTTP_201_CREATED)
async def add_tag_pattern(tag: str, data: Pattern, current_user: HTTPAuthorizationCredentials = Depends(get_current_user)):
  try:
    intent = await Intent.find_one(Intent.tag == tag)

    if intent is None:
      raise HTTPException(
        status.HTTP_404_NOT_FOUND,
        detail="Tag not found!"
      )

    intent.patterns.append(data.pattern.strip())
    await intent.save()

    return {"detail": "Pattern added successfully!"}
  except Exception as e:
    raise HTTPException(
      status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")

@intent.post('/response/{tag}/', status_code=status.HTTP_201_CREATED)
async def add_tag_response(tag: str, data: Response, current_user: HTTPAuthorizationCredentials = Depends(get_current_user)):
  try:
    intent = await Intent.find_one(Intent.tag == tag)

    if intent is None:
      raise HTTPException(
        status.HTTP_404_NOT_FOUND,
        detail="Tag not found!"
      )

    intent.responses.append(data.response.strip())
    await intent.save()

    return {"detail": "Response added successfully!"}
  except Exception as e:
    raise HTTPException(
      status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")