import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import GenerateText from './components/GenerateText';
import PredictParty from './components/PredictParty';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ marginLeft: '1rem' }}> {/* Añadido margen a la izquierda */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate_tweet" element={<GenerateText />} />
          <Route path="/predict" element={<PredictParty />} />
        </Routes>
      </div>
    </Router>
  );
}

// Componente funcional para la ruta inicial "/"
function Home() {
  return (
    <div>
      <h1>Bienvenido a tu Aplicación</h1>
      <p>Esta aplicación te permite interactuar con modelos de IA para generar texto y predecir la afiliación política de tweets.</p>
      <p>Selecciona una opción en la barra de navegación para empezar:</p>
      <ul>
        <li><strong><a href="/generate_tweet">Generar Texto</a></strong>: Introduce un partido político y una palabra para generar un texto.</li>
        <li><strong><a href="/predict">Predecir Partido</a></strong>: Introduce un tweet y un partido político para predecir si pertenece a ese partido.</li>
      </ul>
      <p>Para más detalles, visita el <a href="https://github.com/JoseLu201/TextGAN-PyTorch/tree/main" target="_blank" rel="noopener noreferrer">repositorio en GitHub</a>.</p>
    </div>
  );
}

export default App;
