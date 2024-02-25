import os

from dotenv import load_dotenv
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from src.models.admin import Admin

load_dotenv()
MONGODB_URI = os.getenv('MONGODB_URI_ATLAS')
MONGODB_NAME = os.getenv('MONGODB_NAME')

client = AsyncIOMotorClient(MONGODB_URI)
db = client[MONGODB_NAME]


async def init_db():
    """
    The `init_db` function initializes the database and sets up the document models for various question
    types, accounts, activities, and users.
    """
    try:
        await init_beanie(
            database=db,
            document_models=[
                Admin
            ],
        )
    except Exception as e:
        print(e)
