from pydantic import BaseModel

class GenerateTextInput(BaseModel):
    model_path: str
    gen_model: str
    word: str

class PredictPartyInput(BaseModel):
    model_path: str
    dis_model: str
    tweet: str