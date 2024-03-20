import os

from dotenv import load_dotenv
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi

from src.models.admin import Admin
from src.models.inquiry import Inquiry
from src.models.knowledge_base import KnowledgeBase
from src.models.intent import Intent
from src.models.conversation import Conversation
from src.models.feedback import Feedback

load_dotenv()
MONGODB_URI = os.environ.get('MONGODB_URI_ATLAS')
MONGODB_NAME = os.environ.get('MONGODB_NAME')
PRODUCTION = os.environ.get('PRODUCTION')

if PRODUCTION == "True":
    MONGODB_URI = os.getenv('MONGODB_URI')

client = AsyncIOMotorClient(MONGODB_URI, server_api=ServerApi('1'))
db = client[MONGODB_NAME]


async def init_db():
    """
    The `init_db` function initializes the database and sets up the document models.
    """
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
        await init_beanie(
            database=db,
            document_models=[
                Admin,
                Inquiry,
                KnowledgeBase,
                Conversation,
                Intent,
                Feedback
            ],
        )
    except Exception as e:
        print(e)
