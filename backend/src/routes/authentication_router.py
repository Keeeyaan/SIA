from fastapi import APIRouter, status, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import JWTError, jwt
from dotenv import load_dotenv
from os import getenv

from src.models.admin import Admin
from src.utils import get_current_user

auth = APIRouter()

load_dotenv()
ACCESS_TOKEN_EXPIRES_WEEKS = getenv("ACCESS_TOKEN_EXPIRES_WEEKS")

SECRET_KEY = getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str):
  return pwd_context.verify(plain_password, hashed_password)

async def authenticate_user(email: str, password:str):
  user = await Admin.find_one(Admin.email == email)

  if not user or not verify_password(password, user.password):
    return False
  
  return user

def create_access_token(data: dict, expires_delta: timedelta):
  to_encode = data.copy()
  expire = datetime.utcnow() + expires_delta
  to_encode.update({"exp": expire})
  encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
  return encoded_jwt

@auth.post('/token', status_code=status.HTTP_200_OK)
async def login(data: dict) -> object:
  user = await authenticate_user(data.get("email"), data.get("password"))
  if not user:
    HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="Invalid login credentials",
      headers={"WWW-Authenticate": "Bearer"}
    )

  access_token_expires = timedelta(weeks=int(ACCESS_TOKEN_EXPIRES_WEEKS))
  access_token = create_access_token(
    data={"sub": user.email},
    expires_delta=access_token_expires
  )

  return {"access_token": access_token, "token_type": "bearer"}

@auth.get('/users/me', status_code=status.HTTP_200_OK)
async def current_user(current_user: HTTPAuthorizationCredentials = Depends(get_current_user)):
  return current_user