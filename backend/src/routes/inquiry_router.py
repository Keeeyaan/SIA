from fastapi import APIRouter, status
from bson import ObjectId
from typing import List

from src.models.inquiry import Inquiry

inquiry = APIRouter()

@inquiry.get('/', status_code=status.HTTP_200_OK, response_model=List[Inquiry])
async def get_all_inquiries():
    inquiries = await Inquiry.find_all().to_list()
    return inquiries

@inquiry.post('/', status_code=status.HTTP_201_CREATED, response_model=Inquiry)
async def post_inquiry(item: Inquiry):
    await item.insert()
    return {"message": "Inquiry created successfully"}

@inquiry.put("/{id}", status_code=status.HTTP_200_OK, response_model=Inquiry)
async def update_inquiry(id: str, updated_data: dict):
    item = await Inquiry.find_one(Inquiry.id == ObjectId(id))

    for field, value in updated_data.items():
        setattr(item,field,value)

    await item.save()

    return {"message": "Inquiry updated successfully"}

@inquiry.delete("/{id}", status_code=status.HTTP_200_OK, response_model=Inquiry)
async def delete_inquiry(id: str):
    await Inquiry.find_one(Inquiry.id == ObjectId(id)).delete()
    return {"message": "Inquiry deleted successfully"}