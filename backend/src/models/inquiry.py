from beanie import Document
from pydantic import BaseModel
from datetime import datetime


class Token(BaseModel):
    token: str
    lastLogged: datetime


class Inquiry(Document):
    token: Token
    inquiry: str
    version: Optional[str]
    tag: Optional[str]
    created_at: Optional[datetime] = datetime.now()

    class Settings:
        name = "inquiries"

    class Config:
        json_schema_extra = {
            "example": {
                "token": {
                    "token": "m0,`wF=U_N1(r+D&I0c_3/)g£f<^3o-j7&e?<W'M>!I£36i£V]",
                    "lastLogged": "2024-03-04 22:49:31.378826"
                },
                "inquiry": "What is your name?",
                "version": "version_2.2",
                "tag": "about",
            }
        }
