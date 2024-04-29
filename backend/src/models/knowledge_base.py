from beanie import Document
from datetime import datetime
from typing import List, Optional

from src.models.intent import Intent


class KnowledgeBase(Document):
    intents: Optional[List[Intent]] = []
    version: str
    created_at: Optional[datetime] = datetime.now()

    class Settings:
        name = "kbs"

    class Config:
        json_schema_extra = {
            "example": {
                "version": "1.0",
            }
        }
