from beanie import Document
from datetime import datetime
from typing import Optional

from src.models.conversation import Sequence


class Feedback(Document):
    sequence: Sequence
    comment: str
    sentiment: str
    version: Optional[str]
    created_at: Optional[datetime] = datetime.now()

    class Settings:
        name = "feedbacks"

    class Config:
        json_schema_extra = {
            "example": {
                "sequence": {
                    "inquiry": "Hello",
                    "response": "Hi, how can I help you?",
                    "created_at": "2024-03-09T12:08:10.668933"
                },
                "comment": "Response is appropriate for the inquiry.",
                "sentiment": "Neutral",
                "version": "1.0",
                "created_at": "2024-03-09T12:08:10.670173"
            }
        }
