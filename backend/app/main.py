from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch


app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las fuentes, cámbialo según tus necesidades
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (POST, GET, etc.)
    allow_headers=["*"],  # Permitir todos los encabezados
)

class GenerateTextInput(BaseModel):
    partido: str
    word: str

class PredictPartyInput(BaseModel):
    partido: str
    tweet: str
    
    
def generate_text_function(model, partido, word):
    print("data", partido)
    return "Hola buenas tardes"

def predict_party_function(model, partido, tweet):
    return True

# Cargar los modelos entrenados
text_generator_model=  None#= joblib.load('../model/text_generator_model.pkl')
party_predictor_model = None # = joblib.load('../model/party_predictor_model.pkl')

@app.post("/generate_tweet")
def generate_tweet(data: GenerateTextInput):
    try:
        generated_text = generate_text_function(text_generator_model, data.partido, data.word)
        return {"generated_text": generated_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict_party")
def predict_party(data: PredictPartyInput):
    try:
        prediction = predict_party_function(party_predictor_model, data.party, data.tweet)
        return {"prediction": prediction}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))