import React, { useState } from 'react';
import axios from 'axios';
import { getPartidoImage } from '../utils.js'; 
import './GenerateText.css';

function GenerateText() {
  const [partido, setPartido] = useState('');
  const [word, setWord] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/generate_tweet', { partido, word });
      setGeneratedText(response.data.generated_text);
    } catch (error) {
      if (error.response) {
        // Error de respuesta del servidor
        console.error('Error en la respuesta:', error.response.data);
        setError('Error en la solicitud. Por favor, verifica los datos.');
      } else if (error.request) {
        // Error de solicitud (sin respuesta del servidor)
        console.error('Error al hacer la solicitud:', error.request);
        setError('Error al intentar enviar la solicitud. Inténtalo de nuevo más tarde.');
      } else {
        // Otro tipo de error
        console.error('Error:', error.message);
        setError('Ocurrió un error. Por favor, inténtalo de nuevo.');
      }
    }
  };



  return (
    <div className="container mt-4">
      <h1>Generar Texto</h1>
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
          <label htmlFor="word" className="form-label">Palabra</label>
          <input type="text" id="word" className="form-control" value={word} onChange={(e) => setWord(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Generar</button>
      </form>
      {generatedText && (
        <div className="result mt-4">
          <h3>Texto Generado</h3>
          <p>{generatedText}</p>
        </div>
      )}
    </div>
  );
}

export default GenerateText;
