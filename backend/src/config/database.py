import os

from dotenv import load_dotenv
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from src.models.admin import Admin
from src.models.inquiry import Inquiry
from src.models.knowledge_base import KnowledgeBase
from src.models.intent import Intent
from src.models.conversation import Conversation

load_dotenv()
MONGODB_URI = os.getenv('MONGODB_URI_ATLAS')
MONGODB_NAME = os.getenv('MONGODB_NAME')

client = AsyncIOMotorClient(MONGODB_URI)
db = client[MONGODB_NAME]


async def init_db():
    """
    The `init_db` function initializes the database and sets up the document models.
    """
    try:
        await init_beanie(
            database=db,
            document_models=[
                Admin,
                Inquiry,
                KnowledgeBase,
                Conversation,
                Intent
            ],
        )
    except Exception as e:
        print(e)
