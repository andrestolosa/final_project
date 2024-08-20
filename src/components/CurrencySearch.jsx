import React, { useState } from 'react';
import DropdownBaseCurrency from './DropdownBaseCurrency.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBitcoinSign } from "@fortawesome/free-solid-svg-icons";
import './styles.css';

const CurrencySearch = () => {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [conversionResults, setConversionResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleBaseCurrencyChange = async (selectedCurrency) => {
    setBaseCurrency(selectedCurrency);

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}&per_page=10`
      );
      const data = await response.json();

      if (data.length > 0) {
        setConversionResults(data);
        setErrorMessage('');
      } else {
        setConversionResults([]);
        setErrorMessage('No es posible consultar esta moneda.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Error al consultar la API. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className="container mt-4">
      
      <h1 className='main-title'><FontAwesomeIcon icon={faBitcoinSign} /> Criptomonedas </h1>
      <p>Selecciona una moneda base:</p>
      <DropdownBaseCurrency onSelectCurrency={handleBaseCurrencyChange} />

      {errorMessage && <p className="text-danger">{errorMessage}</p>}

      <h2 className='main-title' >Resultados de la conversión:</h2>
      <table className="table_convert table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Símbolo</th>
            <th>Precio Actual</th>
          </tr>
        </thead>
        <tbody>
          {conversionResults.map((result) => (
            <tr key={result.id}>
              <td>{result.name}</td>
              <td>{result.symbol}</td>
              <td>${result.current_price}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default CurrencySearch;
