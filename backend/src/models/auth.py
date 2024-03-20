from pydantic import BaseModel, EmailStr


class LoginRequestBody(BaseModel):
    email: str
    password: str

    class Config:
        json_schema_extra = {
            "example": {
                "email": "testuser@test.com",
                "password": "Test1234"
            }
        }
