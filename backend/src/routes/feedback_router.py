from fastapi.security import HTTPAuthorizationCredentials
from fastapi import APIRouter, status, Depends
from bson import ObjectId
from typing import List

from src.models.feedback import Feedback
from src.routes.inquiry_router import not_found
from src.utils.user import get_current_user
from src.utils.train import analyze_sentiment

feedback = APIRouter()


@feedback.get('/', status_code=status.HTTP_200_OK)
async def get_feedbacks(current_user: HTTPAuthorizationCredentials = Depends(get_current_user)) -> List[Feedback]:
    feedbacks = await Feedback.find_all().to_list()
    return feedbacks


@feedback.post('/', status_code=status.HTTP_201_CREATED, response_model=Feedback)
async def post_feedback(data: Feedback) -> Feedback:
    sentiment = analyze_sentiment(data.comment)
    data.sentiment = sentiment
    await data.create()

    return data


@feedback.delete('/{id}', status_code=status.HTTP_200_OK)
async def delete_feedback(id: str, current_user: HTTPAuthorizationCredentials = Depends(get_current_user)) -> dict:
    feedback = await Feedback.find_one(Feedback.id == ObjectId(id))

    not_found("Feedback", feedback)

    await feedback.delete()

    return {"detail": "Feedback deleted successfully", "deleted_feedback": feedback}
