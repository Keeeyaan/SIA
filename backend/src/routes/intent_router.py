from fastapi import APIRouter, status, HTTPException, Depends
from fastapi.security import HTTPAuthorizationCredentials

from src.models.intent import Intent, Pattern, Response
from src.utils.user import get_current_user
import random

intent = APIRouter()


@intent.get('/', status_code=status.HTTP_200_OK)
async def get_all_intents(current_user: HTTPAuthorizationCredentials = Depends(get_current_user)):
    intent = await Intent.find_all().to_list()
    return intent

@intent.get('/public/', status_code=status.HTTP_200_OK)
async def get_all_intents_public():
    intents = await Intent.find_all().to_list()
    sorted_intents = sorted(intents, key=lambda x: x.frequency, reverse=True)
    top_5_intents = sorted_intents[:5]

    for intent in top_5_intents:
        intent.patterns = random.choice(intent.patterns)
        del intent.responses

    return top_5_intents


@intent.post('/', status_code=status.HTTP_201_CREATED)
async def create_intent(intent: Intent, current_user: HTTPAuthorizationCredentials = Depends(get_current_user)):
    await intent.create()
    return {"detail": "Intent created successfully!"}


@intent.delete('/{tag}', status_code=status.HTTP_201_CREATED)
async def delete_intent_by_tag(tag: str, current_user: HTTPAuthorizationCredentials = Depends(get_current_user)):
    intent = await Intent.find_one(Intent.tag == tag)
    await intent.delete()
    return {"detail": "Intent deleted successfully!"}


@intent.get('/{tag}/', status_code=status.HTTP_200_OK)
async def get_all_patterns_and_responses_by_tag(tag: str, current_user: HTTPAuthorizationCredentials = Depends(get_current_user)):
    intent = await Intent.find_one(Intent.tag == tag)
    return {"patterns": intent.patterns, "responses": intent.responses}


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


@intent.patch("/pattern/{tag}/id/{id}/", status_code=status.HTTP_200_OK)
async def update_tag_pattern(tag: str, id: int, data: Pattern,  current_user: HTTPAuthorizationCredentials = Depends(get_current_user)):
    intent = await Intent.find_one(Intent.tag == tag)

    if intent is None:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            detail="Tag not found!"
        )

    if id not in range(len(intent.patterns)):
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            detail="Pattern not found!")

    await intent.set({Intent.patterns[id]: data.pattern})

    return {"detail": "Pattern updated successfully!"}


@intent.delete('/pattern/{tag}/id/{id}/', status_code=status.HTTP_200_OK)
async def delete_tag_pattern(tag: str, id: int,  current_user: HTTPAuthorizationCredentials = Depends(get_current_user)):

    intent = await Intent.find_one(Intent.tag == tag)

    if intent is None:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            detail="Tag not found!"
        )

    if id not in range(len(intent.patterns)):
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            detail="Pattern not found!")

    intent.patterns.pop(id)
    await intent.save()

    return {"detail": "Pattern successfully removed."}


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


@intent.patch("/response/{tag}/id/{id}/", status_code=status.HTTP_200_OK)
async def update_tag_response(tag: str, id: int, data: Response,  current_user: HTTPAuthorizationCredentials = Depends(get_current_user)):
    intent = await Intent.find_one(Intent.tag == tag)

    if intent is None:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            detail="Tag not found!"
        )

    if id not in range(len(intent.responses)):
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            detail="Response not found!")

    await intent.set({Intent.responses[id]: data.response})

    return {"detail": "Response updated successfully!"}


@intent.delete('/response/{tag}/id/{id}/', status_code=status.HTTP_200_OK)
async def delete_tag_response(tag: str, id: int,  current_user: HTTPAuthorizationCredentials = Depends(get_current_user)):

    intent = await Intent.find_one(Intent.tag == tag)

    if intent is None:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            detail="Tag not found!"
        )

    if id not in range(len(intent.responses)):
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            detail="Response not found!")

    intent.responses.pop(id)
    await intent.save()

    return {"detail": "Response successfully removed."}
