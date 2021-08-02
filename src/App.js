import React from 'react';
import './App.css';
import ConvertForm from './components/ConvertForm'

function App() {

  return (
    <div className="App">
      <ConvertForm />
      <div className="appTxt">
        <h1>Hello</h1>
        <p>CurrencyCala by Valacodes</p>
        <a href="http://valacodes.netlify.app">ValaCodes</a>
      </div>
    </div>
  );
}

export default App;
