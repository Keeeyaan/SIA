from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from dotenv import load_dotenv
from os import getenv
from passlib.context import CryptContext
from datetime import datetime, timedelta

from src.models.admin import Admin

security = HTTPBearer()

load_dotenv()
ACCESS_TOKEN_EXPIRES_WEEKS = getenv("ACCESS_TOKEN_EXPIRES_WEEKS")
SECRET_KEY = getenv("SECRET_KEY")
ALGORITHM = getenv("ALGORITHM")


async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"}
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = await Admin.find_one(Admin.email == email)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Admin user not found"
        )

    return {
        "user": user,
        "token": token
    }


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


async def authenticate_user(email, password):
    user = await Admin.find_one(Admin.email == email)

    if user is None or not verify_password(password, user.password):
        return False

    return user


def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def password_validator(password: str):
    if len(password) < 8:
        raise HTTPException(
            status_code=400, detail="Password must be at least 8 characters long")
    if not any(char.isdigit() for char in password):
        raise HTTPException(
            status_code=400, detail="Password must contain at least one digit")
    if not any(char.isalpha() for char in password):
        raise HTTPException(
            status_code=400, detail="Password must contain at least one letter")
    if not any(char.isupper() for char in password):
        raise HTTPException(
            status_code=400, detail="Password must contain at least one uppercase letter")
    if not any(char.islower() for char in password):
        raise HTTPException(
            status_code=400, detail="Password must contain at least one lowercase letter")


def hash_pw(password: str) -> str:
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    return pwd_context.hash(password)


def not_found(information: str, obj: Admin):
    if obj is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"{information} not found"
        )
