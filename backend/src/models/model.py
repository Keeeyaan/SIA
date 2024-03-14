from pydantic import BaseModel

class TrainModel(BaseModel):
    filename: str
    filename_extension: str