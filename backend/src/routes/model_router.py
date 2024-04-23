from fastapi import APIRouter, status, Depends
from fastapi.security import HTTPAuthorizationCredentials

from src.utils.train import init, create_model, fit_model, save_model
from src.utils.user import get_current_user

from src.models.model import TrainModel
from src.models.knowledge_base import KnowledgeBase
from src.models.intent import Intent

from datetime import datetime

model = APIRouter()

@model.get('/', status_code=status.HTTP_200_OK)
async def get_latest_model():
    all_kbs = await KnowledgeBase.find_all().to_list()
    sorted_kbs = sorted(all_kbs,key=lambda x: x.created_at, reverse=True)

    versions = [ kb.version for kb in sorted_kbs ]

    return { "available_versions":  versions }


@model.post('/', status_code=status.HTTP_200_OK)
async def train_model(data: TrainModel, current_user: HTTPAuthorizationCredentials = Depends(get_current_user)) -> dict:
    intents = await Intent.find_all().to_list()

    create = KnowledgeBase(intents=intents, version=data.kbs_version, created_at=datetime.now())

    await create.create()  

    kbs = await KnowledgeBase.find_one(KnowledgeBase.version == data.kbs_version)

    initial = init({"intents": kbs.intents})

    model = create_model(
        initial.get("vocabulary_size"),
        initial.get("input_shape"),
        initial.get("output_length")
    )

    model = fit_model(
        model,
        initial.get("x_train"),
        initial.get("y_train")
    )

    save_model(model, f"version_{data.kbs_version}", "keras")

    return {"detail": "Model updated successfully!"}