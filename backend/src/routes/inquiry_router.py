from fastapi import APIRouter, status, Depends
from fastapi.security import HTTPAuthorizationCredentials
from bson import ObjectId
from typing import List

from src.models.inquiry import Inquiry, InquiryBody
from src.utils.user import get_current_user, not_found

inquiry = APIRouter()


@inquiry.get('/', status_code=status.HTTP_200_OK)
async def get_all_inquiries(current_user: HTTPAuthorizationCredentials = Depends(get_current_user)) -> List[Inquiry]:
    inquiries = await Inquiry.find_all().to_list()
    return inquiries


@inquiry.post('/', status_code=status.HTTP_201_CREATED)
async def post_inquiry(item: InquiryBody):
    # await item.insert()
    return item


@inquiry.patch("/{id}", status_code=status.HTTP_200_OK)
async def update_inquiry(id: str, data: dict, current_user: HTTPAuthorizationCredentials = Depends(get_current_user)) -> dict:
    inquiry = await Inquiry.find_one(Inquiry.id == ObjectId(id))

    not_found("Inquiry", inquiry)

    for field, value in data.items():
        setattr(inquiry, field, value)

    await inquiry.save()

    return {"detail": "Inquiry updated successfully", "updated_inquiry": inquiry}


@inquiry.delete("/{id}", status_code=status.HTTP_200_OK)
async def delete_inquiry(id: str, current_user: HTTPAuthorizationCredentials = Depends(get_current_user)) -> dict:
    inquiry = await Inquiry.find_one(Inquiry.id == ObjectId(id))

    not_found("Inquiry", inquiry)

    await inquiry.delete()

    return {"detail": "Inquiry deleted successfully", "deleted_inquiry": inquiry}
