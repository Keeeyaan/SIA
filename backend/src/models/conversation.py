from beanie import Document
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional


class Sequence(BaseModel):
    inquiry: str
    response: str
    createdAt: Optional[datetime] = datetime.now()

    class Settings:
        name = "sequences"

    class Config:
        json_schema_extra = {
            "example": {
                "inquiry": "Hello",
                "response": "Hi, how can I help you today?",
                "createdAt": "2024-03-09T12:08:10.670173"
            }
        }


class Conversation(Document):
    token: str
    sequence: List[Sequence]
    createdAt: Optional[datetime] = datetime.now()

    class Settings:
        name = "conversations"

    class Config:
        json_schema_extra = {
            "example": {
                "token": "OmB!N:rS#'(£[.&3xU6:qyT;3/ru'=sYmCxIT+whb\}_|Iv?;",
                "sequence": [
                    {
                        "inquiry": "Hello",
                        "response": "Hi, how can I help you today?",
                        "createdAt": "2024-03-09T12:08:10.670173"
                    }
                ],
                "createdAt": "2024-03-09T12:08:10.670173"
            }
        }
