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
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0dXNlckB0ZXN0LmNvbSIsImV4cCI6MTcxMjcxMzA4MX0.wiqf8zrLFfdlwkdMR3Km2Z6qcmEb48StitYM5Yg8zEg",
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


class PostConversation(BaseModel):
    inquiry: str
    kbs_version: str

    class Config:
        json_schema_extra = {
            "example": {
                "inquiry": "Hi",
                "kbs_version": "1.0"
            }
        }


class UpdateConversation(BaseModel):
    token: str
    inquiry: str
    kbs_version: str

    class Config:
        json_schema_extra = {
            "example": {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0dXNlckB0ZXN0LmNvbSIsImV4cCI6MTcxMjcxMzA4MX0.wiqf8zrLFfdlwkdMR3Km2Z6qcmEb48StitYM5Yg8zEg",
                "inquiry": "Hi",
                "kbs_version": "1.0"
            }
        }