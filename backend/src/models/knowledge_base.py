from pydantic import BaseModel
from beanie import Document
from datetime import datetime
from typing import List, Optional


class Intent(BaseModel):
    tag: Optional[str] = "TBD"
    patterns: Optional[List[str]]
    responses: Optional[List[str]]
    frequency: Optional[int] = 0


class KnowledgeBase(Document):
    intents: List[Intent]
    version: Optional[str] = "TBD"
    updatedAt: Optional[datetime] = datetime.now()

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