import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import GenerateText from './components/GenerateText';
import PredictParty from './components/PredictParty';
import './App.css';  // Importamos el archivo de CSS

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate_tweet" element={<GenerateText />} />
          <Route path="/predict" element={<PredictParty />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home">
      <h1 className="home-title">Bienvenido a la Aplicación del TFG</h1>
      <p className="home-text">
        Este proyecto es parte de mi Trabajo de Fin de Grado, en el cual he desarrollado una aplicación utilizando Redes Generativas Antagónicas (GANs). La aplicación permite generar texto y predecir cuan real un tweet es para un partido.
      </p>
      <p className="home-text">
        Utiliza la barra de navegación para explorar las siguientes funcionalidades:
      </p>
      <ul className="home-list">
        <li><strong><a href="/generate_tweet">Generar Texto</a></strong>: Genera texto relacionado con un partido político a partir de una palabra clave utilizando un generador entrenado con GANs.</li>
        <li><strong><a href="/predict">Predecir Partido</a></strong>: Introduce un tweet y un partido político para predecir si el tweet podría pertenecer a dicho partido, utilizando un discriminador entrenado.</li>
      </ul>
      <p className="home-text">
        Para más información sobre el desarrollo de este proyecto, puedes consultar el <a href="https://github.com/JoseLu201/TextGAN-PyTorch/tree/main" target="_blank" rel="noopener noreferrer">repositorio en GitHub</a>.
      </p>
    </div>
  );
}

export default App;
