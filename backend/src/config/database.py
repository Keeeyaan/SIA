import os

from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import HTTPException, status

from src.models.admin import Admin
from src.models.inquiry import Inquiry
from src.models.knowledge_base import KnowledgeBase
from src.models.intent import Intent
from src.models.conversation import Conversation
from src.models.feedback import Feedback


MONGODB_URI = os.environ.get('MONGODB_URI')
MONGODB_NAME = os.environ.get('MONGODB_NAME')

if MONGODB_URI is None or MONGODB_NAME is None:
    raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                        detail='Please define the MONGODB_URI and MONGODB_NAME environment variable inside .env')


async def init_db():
    """
    The `init_db` function initializes the database and sets up the document models.
    """
    try:
        client = AsyncIOMotorClient(MONGODB_URI)
        db = client[MONGODB_NAME]

        await init_beanie(
            database=db,
            document_models=[
                Admin,
                Intent,
                Inquiry,
                KnowledgeBase,
                Conversation,
                Feedback
            ],
        )
    except Exception as e:
        print(e)
