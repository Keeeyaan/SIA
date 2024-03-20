from fastapi import APIRouter, status, Depends
from fastapi.security import HTTPAuthorizationCredentials

from src.utils.train import init, create_model, fit_model, save_model
from src.utils.user import get_current_user
from src.models.model import TrainModel

from src.models.intent import Intent

model = APIRouter()


@model.post('/', status_code=status.HTTP_200_OK)
async def train_model(data: TrainModel, current_user: HTTPAuthorizationCredentials = Depends(get_current_user)):
    intents = await Intent.find_all().to_list()

    initial = init({'intents': intents})

    model = create_model(
        initial.get('vocabulary_size'),
        initial.get('input_shape'),
        initial.get('output_length')
    )

    model = fit_model(
        model,
        initial.get('x_train'),
        initial.get('y_train')
    )

    save_model(model, data.filename, data.filename_extension)
