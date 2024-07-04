import React, { useState } from 'react';
import axios from 'axios';
import { getPartidoImage } from '../utils.js'; 
import './PredictParty.css';

function PredictParty() {
  const [partido, setPartido] = useState('');
  const [tweet, setTweet] = useState('');
  const [prediction, setPrediction] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/predict_party', { partido, tweet });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Predecir Partido</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <label htmlFor="partido" className="form-label">Partido Político</label>
        <div className="partido-select d-flex align-items-center">
          <select id="partido" className="form-select" value={partido} onChange={(e) => setPartido(e.target.value)} required>
              <option value="">Selecciona un partido...</option>
              <option value="psoe">PSOE</option>
              <option value="pp">PP</option>
              <option value="podemos">PODEMOS</option>
              <option value="ciudadanos">CIUDADANOS</option>
              <option value="vox">VOX</option>
          </select>
          {partido && (
              <img src={getPartidoImage(partido)} alt={`Logo ${partido}`} className="partido-image" />
            )}
            </div>
        </div>
        <div className="mb-3">
          <label htmlFor="tweet" className="form-label">Tweet</label>
          <textarea id="tweet" className="form-control" rows="4" value={tweet} onChange={(e) => setTweet(e.target.value)} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Predecir</button>
      </form>
      {prediction && (
        <div className="result mt-4">
          <h3>Predicción</h3>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
}

export default PredictParty;
