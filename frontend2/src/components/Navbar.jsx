import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Predictor Político</Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/generate_tweet">Generar Texto</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/predict">Predecir Partido</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
