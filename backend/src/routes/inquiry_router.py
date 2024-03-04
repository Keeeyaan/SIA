from fastapi import APIRouter, status, HTTPException
from bson import ObjectId
from typing import List

from src.models.inquiry import Inquiry

inquiry = APIRouter()

def not_found(information: str, obj: Inquiry):
  if obj is None:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail=f"{information} not found"
    )

@inquiry.get('/', status_code=status.HTTP_200_OK)
async def get_all_inquiries() -> List[Inquiry]:
  inquiries = await Inquiry.find_all().to_list()
  return inquiries

@inquiry.post('/', status_code=status.HTTP_201_CREATED, response_model=Inquiry)
async def post_inquiry(item: Inquiry) -> Inquiry:
  await item.insert()
  return item

@inquiry.patch("/{id}", status_code=status.HTTP_200_OK)
async def update_inquiry(id: str, data: dict) -> object:
  inquiry = await Inquiry.find_one(Inquiry.id == ObjectId(id))

  not_found("Inquiry", inquiry)

  for field, value in data.items():
    setattr(inquiry,field,value)

  await inquiry.save()

  return {"detail": "Inquiry updated successfully", "updated_inquiry": inquiry}

@inquiry.delete("/{id}", status_code=status.HTTP_200_OK)
async def delete_inquiry(id: str) -> object:
  inquiry = await Inquiry.find_one(Inquiry.id == ObjectId(id))

  not_found("Inquiry", inquiry)

  await inquiry.delete()
  
  return {"detail": "Inquiry deleted successfully", "deleted_inquiry": inquiry}