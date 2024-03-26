from typing import Optional
from beanie import Document
from pydantic import BaseModel
from datetime import datetime


class Inquiry(Document):
    token: str
    inquiry: str
    version: Optional[str]
    tag: Optional[str]
    created_at: Optional[datetime] = datetime.now()

    class Settings:
        name = "inquiries"

    class Config:
        json_schema_extra = {
            "example": {
                "token": "asdasdasd",
                "inquiry": "What is your name?",
                "version": "version_2.2",
                "tag": "about",
            }
        }


class InquiryBody(BaseModel):
    inquiry: str
    token: str

    class Config:
        json_schema_extra = {
            "example": {
                "inquiry": "What is your name?",
                "token": "asd"
            }
        }
