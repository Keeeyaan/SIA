from datetime import datetime
from typing import Optional, Annotated
from beanie import Document, Indexed
from pydantic import EmailStr


class Admin(Document):
    email: Annotated[EmailStr, Indexed(unique=True)]
    password: str
    first_name: str
    last_name: str
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Settings:
        name = "admins"

    class Config:
        json_schema_extra = {
            "example": {
                "email": "testuser@test.com",
                "password": "Test1234",
                "first_name": "test",
                "last_name": "user",
            }
        }

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.created_at = kwargs.get('created_at', datetime.now())
        self.updated_at = kwargs.get('updated_at', datetime.now())
