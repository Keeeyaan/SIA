from fastapi import APIRouter, status, Depends
from fastapi.security import HTTPAuthorizationCredentials

from src.utils.user import get_current_user

from src.models.knowledge_base import KnowledgeBase
from src.models.intent import Intent
from src.models.feedback import Feedback
from src.models.inquiry import Inquiry

stat = APIRouter()


@stat.get('/', status_code=status.HTTP_200_OK)
async def get_stat(current_user: HTTPAuthorizationCredentials = Depends(get_current_user)):
    kbs = await KnowledgeBase.find_all().to_list()
    feedbacks = await Feedback.find_all().to_list()
    intents = await Intent.find_all().to_list()
    inquiries = await Inquiry.find_all().to_list()

    return {"models": len(kbs), "inquiries": len(inquiries), "intents": len(intents), "feedbacks": len(feedbacks)}
