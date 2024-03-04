from fastapi import APIRouter, status, HTTPException
from bson import ObjectId
from passlib.context import CryptContext
from typing import List
from pymongo.errors import DuplicateKeyError

from src.models.admin import Admin

admin = APIRouter()

def password_validator(password: str):
  if len(password) < 8:
    raise HTTPException(status_code=400, detail="Password must be at least 8 characters long")
  if not any(char.isdigit() for char in password):
    raise HTTPException(status_code=400, detail="Password must contain at least one digit")
  if not any(char.isalpha() for char in password):
    raise HTTPException(status_code=400, detail="Password must contain at least one letter")
  if not any(char.isupper() for char in password):
    raise HTTPException(status_code=400, detail="Password must contain at least one uppercase letter")
  if not any(char.islower() for char in password):
    raise HTTPException(status_code=400, detail="Password must contain at least one lowercase letter")

def hash_pw(password: str) -> str:
  pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
  return pwd_context.hash(password)

def not_found(information: str, obj: Admin):
  if obj is None:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail=f"{information} not found"
    )

@admin.get('/', status_code=status.HTTP_200_OK)
async def get_all_admins() -> List[Admin]:
  admins = await Admin.find_all().to_list()
  return admins

@admin.post('/', status_code=status.HTTP_201_CREATED, response_model=Admin)
async def register_admin(data: Admin):
  password_validator(data.password)

  data.password = hash_pw(data.password)

  try:
    await data.insert()
  except DuplicateKeyError:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="E-mail address provided is already associated with an existing account."
    )

  return data

@admin.patch('/{id}', status_code=status.HTTP_200_OK)
async def update_admin_by_id(id: str, data: dict) -> object:
  admin = await Admin.find_one(Admin.id == ObjectId(id))

  not_found("Admin user", admin)
  
  if data.get("password"):
    data["password"] = hash_pw(data.get("password"))

  for field, value in data.items():
    setattr(admin, field, value)
  
  await admin.save()
  
  return {"detail": "Admin user updated successfully", "updated_admin": admin}

@admin.delete('/{id}', status_code=status.HTTP_200_OK)
async def delete_admin_by_id(id: str) -> object:
  admin = await Admin.find_one(Admin.id == ObjectId(id))
  
  not_found("Admin user", admin)

  await admin.delete()

  return {"detail": "Admin user deleted successfully", "deleted_admin": admin}
