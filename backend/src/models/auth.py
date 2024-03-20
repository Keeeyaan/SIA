from pydantic import BaseModel


class LoginRequestBody(BaseModel):
    email: str
    password: str
