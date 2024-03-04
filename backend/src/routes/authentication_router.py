from datetime import datetime, timedelta
from passlib.context import CryptContext
from dotenv import load_dotenv
from jose import JWTError, jwt
from os import environ

from src.models.admin import Admin

load_dotenv()

SECRET_KEY = environ.get("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)


async def get_user(email: str):
    user = await Admin.find_one(Admin.email == email)
    return Admin(user)


def authenticate_user(email: str, password:str):
    user = get_user(email)
    if not user or not verify_password(password, user.password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt