from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .schemas import GenerateTextInput, PredictPartyInput

import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../TextGAN-PyTorch/')))

from generate_text import setup_and_generate_tweets, get_current_path,CHANGE_CURRENT_DIR_MUST,\
    list_available_politicians, available_models_partido, get_all_data_json
from discriminar_tweet import main_discriminar_tweet

app = FastAPI()
CHANGE_CURRENT_DIR_MUST()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las fuentes, cámbialo según tus necesidades
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (POST, GET, etc.)
    allow_headers=["*"],  # Permitir todos los encabezados
)


def generate_text_function(model_path, gen_model, word):
    tweets = "empty"

    if not word:
        print("Word is empty")
        word = 'BOS'
    tweets = setup_and_generate_tweets(model_path, gen_model, word)
    return tweets

def predict_party_function(model_path, gen_model, tweet):
    print("Predicting party")
    try:
        prediction = main_discriminar_tweet(model_path, gen_model, tweet)
        return prediction
    except Exception as e:
        print("Error en la predicción:", e)
        raise HTTPException(status_code=500, detail=str(e))

#
# Rutas
#

@app.post("/generate_tweet")
def generate_tweet(data: GenerateTextInput):
    try:
        print("Posted_Data", data)
        generated_text = generate_text_function(data.model_path, data.gen_model, data.word)
        print("\nGenerated_twetts", generated_text)
        
        return {"generated_text": generated_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict_party")
def predict_party(data: PredictPartyInput):
    '''
    Endpoint que devuelve la probabilidad de que un tweet sea falso o real
    '''
    try:
        print("Posted_Data", data)
        prediction = predict_party_function(data.model_path, data.dis_model, data.tweet)[0][0]
        print("\nPrediction2", prediction)
        return {"fake": prediction[0],
                "real": prediction[1]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/available_partidos")
def available_partidos():
    '''
    Endpoint que devuelve los partidos disponibles
    '''
    try:
        available_partidos = list_available_politicians()
        return {"partidos": available_partidos}
    except Exception as e:      
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/get_all_data_json/")
def get_all_data():
    '''
    Endpoint que devuelve todos los datos en formato JSON
    '''
    try:
        data = get_all_data_json()
        return data
    except Exception as e:      
        raise HTTPException(status_code=500, detail=str(e))