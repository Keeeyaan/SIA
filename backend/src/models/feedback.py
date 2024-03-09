from beanie import Document
from datetime import datetime
from typing import List, Optional

from src.models.conversation import Sequence


class Feedback(Document):
    sequence: List[Sequence]
    comment: str
    sentiment: str
    version: Optional[str]
    createdAt: Optional[datetime] = datetime.now()

    class Settings:
        name = "feedbacks"

    class Config:
        json_schema_extra = {
            "example": {
                "sequence": [
                    {
                        "inquiry": "Hello",
                        "response": "Hi, how can I help you?",
                        "createdAt": "2024-03-09T12:08:10.668933"
                    }
                ],
                "comment": "Response is inaccurate",
                "sentiment": "Negative",
                "version": "1.0",
                "createdAt": "2024-03-09T12:08:10.670173"
            }
        }
