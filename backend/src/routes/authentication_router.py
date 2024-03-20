from fastapi import APIRouter, status, HTTPException, Depends
from fastapi.security import HTTPAuthorizationCredentials
from datetime import timedelta
from pydantic import BaseModel, EmailStr

from src.utils.user import get_current_user, authenticate_user, verify_password, create_access_token
from src.utils.user import ACCESS_TOKEN_EXPIRES_WEEKS
from src.models.admin import Admin


class LoginRequestBody(BaseModel):
    email: EmailStr
    password: str

    class Config:
        schema_extra = {
            "example": {
                "email": "testuser@test.com",
                "password": "Test1234",
            }
        }


auth = APIRouter()


@auth.post('/login', status_code=status.HTTP_200_OK)
async def login(data: LoginRequestBody):
    user = await Admin.find_one(Admin.email == data.email)

    if user is None or verify_password(data.password, user.password) is False:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid login credentials",
        )

    access_token_expires = timedelta(weeks=int(ACCESS_TOKEN_EXPIRES_WEEKS))
    access_token = create_access_token(
        data={"sub": user.email},
        expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer", "message": "User logged in!"}


@auth.get('/users/me', status_code=status.HTTP_200_OK)
async def current_user(current_user: HTTPAuthorizationCredentials = Depends(get_current_user)):
    return current_user
