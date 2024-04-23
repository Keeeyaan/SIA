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
                "intents": [
                    {
                        "tag": "greeting",
                        "patterns": [
                            "hello",
                            "hi there",
                            "nice to meet you"
                        ],
                        "responses": [
                            "Hello there!",
                            "Hi, how can I help you?"
                        ],
                        "frequency": 0
                    }
                ],
                "version": "1.0",
                "updatedAt": "2024-02-29 17:59:56.071409"
            }
        }
