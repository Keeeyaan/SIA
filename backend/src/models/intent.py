from beanie import Document, Indexed
from pydantic import BaseModel
from typing import List, Optional


class Intent(Document):
    tag: str = Indexed(str, unique=True)
    patterns: Optional[List[str]] = []
    responses: Optional[List[str]] = []
    frequency: Optional[int] = 0

    class Settings:
        name = "intents"

    class Config:
        json_schema_extra = {
            "example": {
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
        }


class Pattern(BaseModel):
    pattern: str


class Response(BaseModel):
    response: str