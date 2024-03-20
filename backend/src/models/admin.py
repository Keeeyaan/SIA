from datetime import datetime
from typing import Optional, Annotated
from beanie import Document, Indexed
from pydantic import EmailStr


class Admin(Document):
    email: str
    password: str
    first_name: str
    last_name: str
    created_at: Optional[datetime] = datetime.now()
    updated_at: Optional[datetime] = datetime.now()

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
