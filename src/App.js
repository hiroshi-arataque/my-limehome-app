import React from "react";
import logo from './assets/logo.svg';
import navMenu from './assets/burger-icon.svg';
import './App.css';
import GoogleMap from "./components/map/Map.js";

function App() {

  return (
      <div className="App">
        <header className="App-header">
          <div className="App-logo-container">
            <img src={logo} className="App-logo" alt="logo" />
            <img src={navMenu} className="App-nav-menu" alt="navMenu" />
          </div>
        </header>
        <div>
          <GoogleMap/>
        </div>
      </div>
  );
}

export default App;
