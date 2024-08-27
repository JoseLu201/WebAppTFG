import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getPartidoImage } from '../utils.js';
import './GenerateText.css';

function GenerateText() {
  const [word, setWord] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [error, setError] = useState('');
  const [allData, setAllData] = useState(null);
  const [partidoModels, setPartidoModels] = useState([]);
  const [selectPartido, setSelectPartido] = useState('');
  const [selectModel, setSelectModel] = useState('');
  const [selectModelPath, setSelectModelPath] = useState('');
  const [genModels, setGenModels] = useState([]);
  const [selectGenModel, setSelectGenModel] = useState('');


  // Fetch all data when the component mounts
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
        setGenModels(selectedModel.gen_models);
      }
    }
  }

  const handleGenModelChange = (e) => {
    const selectedGenModelName = e.target.value;
    console.log("Modelo generador seleccionado: ", selectedGenModelName);
    setSelectGenModel(selectedGenModelName);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/generate_tweet', {
        model_path: selectModelPath,
        gen_model: selectGenModel,
        word: word
      });

      setGeneratedText(response.data.generated_text);
      setError(''); // Limpia el error si la solicitud es exitosa
    } catch (error) {
      if (error.response) {
        console.log('Error en la respuesta:', error.response.data);
        setError('Error en la solicitud. Por favor, verifica los datos.');
      } else if (error.request) {
        console.error('Error al hacer la solicitud:', error.request);
        setError('Error al intentar enviar la solicitud. Inténtalo de nuevo más tarde.');
      } else {
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



            <select id="gen_models" className="form-select" value={selectGenModel} onChange={handleGenModelChange} required>
              <option value="">Selecciona un modelo generador...</option>
              {genModels?.sort().map(genModel => (
                <option key={genModel} value={genModel}>{genModel}</option>
              ))}
            </select>
            {selectPartido && (
              <img src={getPartidoImage(selectPartido)} alt={`Logo ${selectPartido}`} className="partido-image" />
            )}

          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="word" className="form-label">Palabra</label>
          <input type="text" id="word" className="form-control" value={word} onChange={(e) => setWord(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Generar</button>
      </form>
      {error && (
        <div className="alert alert-danger mt-3">{error}</div>
      )}
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
