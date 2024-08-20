import React, { useState } from 'react';
import './App.css';
import CurrencySearch from './components/CurrencySearch.jsx';
import CurrencySearchCountry from './components/CurrencySearchCountries.jsx';

function App() {
  const [showCountry, setShowCountry] = useState(false); 

  const handleButtonClick = (componentName) => {
    if (componentName === 'country') {
      setShowCountry(true);
    } else if (componentName === 'cripto') {
      setShowCountry(false);
    }
  };

  return (
    <div className="App">
      <div>
        <button className="btn btn-primary mt-4 me-2" onClick={() => handleButtonClick('country')}>Otros Países</button>
        <button className="btn btn-primary mt-4 me-2" onClick={() => handleButtonClick('cripto')}> Criptomonedas</button>
      </div>
      {showCountry ? <CurrencySearchCountry /> : <CurrencySearch />}
    </div>
  );
}

export default App;
