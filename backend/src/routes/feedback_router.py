from fastapi import APIRouter, status, Depends
from bson import ObjectId
from fastapi.security import HTTPAuthorizationCredentials

from src.models.feedback import Feedback
from src.routes.inquiry_router import not_found
from src.utils.user import get_current_user
# from src.utils.model import analyze_sentiment #comment this on push

feedback = APIRouter()


@feedback.get('/', status_code=status.HTTP_200_OK)
async def get_feedbacks(current_user: HTTPAuthorizationCredentials = Depends(get_current_user)):
    feedbacks = await Feedback.find_all().to_list()
    return feedbacks


@feedback.post('/', status_code=status.HTTP_201_CREATED)
async def post_feedback(data: Feedback):
    # sentiment = analyze_sentiment(data.comment) #comment this on push

    # data.sentiment = sentiment #comment this on push
    data.sentiment = "N/A"
    await data.create()

    return data


@feedback.delete('/{id}', status_code=status.HTTP_200_OK)
async def delete_feedback(id: str, current_user: HTTPAuthorizationCredentials = Depends(get_current_user)):
    feedback = await Feedback.find_one(Feedback.id == ObjectId(id))

    not_found("Feedback", feedback)

    await feedback.delete()

    return {"detail": "Feedback deleted successfully", "deleted_feedback": feedback}
