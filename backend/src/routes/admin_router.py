from fastapi import APIRouter, HTTPException, status
from fastapi.responses import ORJSONResponse

from src.models.admin import Admin
from src.config.database import client

admin = APIRouter()


@admin.get('/')
async def get_all_admins():
    admins = await Admin.find_all().to_list()
    return admins


@admin.post('/', status_code=status.HTTP_201_CREATED, response_model=Admin)
async def register_admin(admin: Admin):
    # admin = await admin.insert()
    return {"message": "hehe"}


@admin.patch('/', status_code=status.HTTP_201_CREATED)
async def update_admin_by_id(id):
    pass


@admin.delete('/', status_code=status.HTTP_201_CREATED)
async def delete_admin_by_id(id):
    pass
