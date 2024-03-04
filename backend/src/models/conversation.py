from beanie import Document
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class Sequence(BaseModel):
    inquiry: str
    response: str
    createdAt: Optional[datetime] = datetime.now()

class Conversation(Document):
    token: str
    sequence: List[Sequence]
    createdAt: Optional[datetime] = datetime.now()