import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getPartidoImage } from '../utils.js';
import './PredictParty.css';

function PredictParty() {
  const [tweet, setTweet] = useState('');
  const [prediction, setPrediction] = useState({});
  const [showPrediction, setShowPrediction] = useState(false);
  const [fade, setFade] = useState('');

  const [disModels, setDisModels] = useState([]);
  const [selectDisModel, setSelectDisModel] = useState('');
  const [selectModel, setSelectModel] = useState('');
  const [partidoModels, setPartidoModels] = useState([]);
  const [selectPartido, setSelectPartido] = useState('');
  const [allData, setAllData] = useState(null);
  const [selectModelPath, setSelectModelPath] = useState('');

  const [error, setError] = useState('');




  useEffect(() => {
    const get_all_data_json = async () => {
      try {
        const response = await axios.get('http://localhost:8000/get_all_data_json/');
        console.log('response:', response);
        const data = response.data; // Asegúrate de que este es el formato correcto
        setAllData(data); // Guardar el JSON completo en el estado
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    get_all_data_json();
  }, []); // Este efecto se ejecuta solo una vez al montar el componente

  const handlePartidoChange = (e) => {
    const selectedPartido = e.target.value;
    console.log("Partido seleccionado: ", selectedPartido)
    setSelectPartido(selectedPartido);
    setPartidoModels([]);
    console.log("len : ", allData?.partidos?.lenght)
    for (const idx in allData?.partidos) {
      console.log('partido:', allData?.partidos[idx].nombre);
      if (allData?.partidos[idx].nombre === selectedPartido) {
        setPartidoModels(allData?.partidos[idx].modelos);
      }
    }
    console.log('allData[selectedPartido].models:', partidoModels);
  }

  const handleModelChange = (e) => {
    const selectedModelName = e.target.value;
    console.log("Modelo seleccionado: ", selectedModelName);
    setSelectModel(selectedModelName);

    if (partidoModels) {
      const selectedModel = partidoModels.find(model => model.model_name === selectedModelName);
      if (selectedModel) {
        console.log("Modelo path: ", selectModelPath);
        setSelectModelPath(selectedModel.model_path);
        setDisModels(selectedModel.dis_models);
      }
    }
  }

  const handleDisModelChange = (e) => {
    const selectedDisModelName = e.target.value;
    console.log("Modelo discriminador seleccionado: ", selectedDisModelName);
    setSelectDisModel(selectedDisModelName);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowPrediction(false);
    setFade('fade-out'); // Inicia el fade-out
    // Esperar un poco antes de hacer la solicitud para que la transición sea visible
  setTimeout(async () => {
    try {
      const response = await axios.post('http://localhost:8000/predict_party', {
        model_path: selectModelPath,
        dis_model: selectDisModel,
        tweet: tweet
      });

      // Actualizar la predicción
      setPrediction(response.data);
      setShowPrediction(true);
      setFade('fade-in'); // Inicia el fade-in

      // Resetear cualquier mensaje de error
      setError('');
    } catch (error) {
      // Manejo de errores
      if (error.response) {
        console.error('Error en la respuesta:', error.response.data);
        setError(`Error en la solicitud: ${error.response.data.detail}`);
      } else if (error.request) {
        console.error('Error al hacer la solicitud:', error.request);
        setError('Error al intentar enviar la solicitud. Inténtalo de nuevo más tarde.');
      } else {
        console.error('Error:', error.message);
        setError('Ocurrió un error. Por favor, inténtalo de nuevo.');
      }
    }
  }, 50); // Duración del fade-out
  };

  return (
    <div className="container mt-4">
      <h1>Predecir Partido</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="partido" className="form-label">Partido Político</label>
          <div className="partido-select d-flex align-items-center">
            <select id="partido" className="form-select" value={selectPartido} onChange={handlePartidoChange} required>
              <option value="">Selecciona un partido...</option>
              {allData?.partidos?.map(partido => (
                <option key={partido.nombre} value={partido.nombre}>{partido.nombre}</option>
              ))}
            </select>

            <select id="modelos" className="form-select" value={selectModel} onChange={handleModelChange} required>
              <option value="">Selecciona un modelos...</option>
              {partidoModels?.map(partido => (
                <option key={partido.model_name} value={partido.model_name}>{partido.model_name}</option>
              ))}
            </select>

            <select id="dis_models" className="form-select" value={selectDisModel} onChange={handleDisModelChange} required>
              <option value="">Selecciona un modelo Discriminador...</option>
              {disModels?.sort().map(disModel => (
                <option key={disModel} value={disModel}>{disModel}</option>
              ))}
            </select>
            {selectPartido && (
              <img src={getPartidoImage(selectPartido)} alt={`Logo ${selectPartido}`} className="partido-image" />
            )}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="tweet" className="form-label">Tweet</label>
          <textarea id="tweet" className="form-control" rows="4" value={tweet} onChange={(e) => setTweet(e.target.value)} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Predecir</button>
      </form>
      {error && (
        <div className="alert alert-danger mt-3">{error}</div>
      )}
      {showPrediction && prediction && (
        <div className={`result mt-4 ${fade}`}>
          <h3>Predicción</h3>
          <p>Fake: {prediction.fake}</p>
          <p>Real: {prediction.real}</p>
        </div>
      )}
    </div>
  );
}

export default PredictParty;
