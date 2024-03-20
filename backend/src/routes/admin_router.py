from fastapi import APIRouter, status, HTTPException, Depends
from fastapi.security import HTTPAuthorizationCredentials
from bson import ObjectId
from typing import List
from pymongo.errors import DuplicateKeyError

from src.models.admin import Admin
from src.utils.user import get_current_user, password_validator, hash_pw, not_found

admin = APIRouter()


@admin.get('/', status_code=status.HTTP_200_OK)
async def get_all_admins() -> List[Admin]:
    admins = await Admin.find_all().to_list()
    return admins


@admin.post('/', status_code=status.HTTP_201_CREATED, response_model=Admin)
async def register_admin(data: Admin, current_user: HTTPAuthorizationCredentials = Depends(get_current_user)):
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
async def update_admin_by_id(id: str, data: dict, current_user: HTTPAuthorizationCredentials = Depends(get_current_user)) -> object:
    admin = await Admin.find_one(Admin.id == ObjectId(id))

    not_found("Admin user", admin)

    if data.get("password"):
        data["password"] = hash_pw(data.get("password"))

    for field, value in data.items():
        setattr(admin, field, value)

    await admin.save()

    return {"detail": "Admin user updated successfully", "updated_admin": admin}


@admin.delete('/{id}', status_code=status.HTTP_200_OK)
async def delete_admin_by_id(id: str, current_user: HTTPAuthorizationCredentials = Depends(get_current_user)) -> object:
    admin = await Admin.find_one(Admin.id == ObjectId(id))

    not_found("Admin user", admin)

    await admin.delete()

    return {"detail": "Admin user deleted successfully", "deleted_admin": admin}
