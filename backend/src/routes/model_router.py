import os
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
async def get_models():
    bot_models_directory = os.path.abspath(os.path.join(os.path.dirname(
        os.path.dirname(os.path.dirname(__file__))), "bot_models"))

    if not os.path.exists(bot_models_directory):
        os.makedirs(bot_models_directory)

    models = []

    if len(os.listdir(bot_models_directory)) > 0:
        for file in os.listdir(bot_models_directory):
            if file.endswith('.keras'):
                filename, _ = os.path.splitext(file)
                models.append(filename)

    return {"models":  models}


@model.post('/', status_code=status.HTTP_200_OK)
async def create_model_api(data: TrainModel, current_user: HTTPAuthorizationCredentials = Depends(get_current_user)) -> dict:
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

    return {"detail": "Model created successfully!"}
