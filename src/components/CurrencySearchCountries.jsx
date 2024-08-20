import React, { useState } from 'react';
import DropdownBaseCurrency from './DropdownBaseCurrency.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import './styles.css';

const CurrencySearchCountry = () => {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [conversionResults, setConversionResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleBaseCurrencyChange = async (selectedCurrency) => {
    setBaseCurrency(selectedCurrency);

    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${selectedCurrency}`
      );
      const data = await response.json();

      if (data.rates) {
        setConversionResults(Object.entries(data.rates));
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
      <h1 className='main-title' ><FontAwesomeIcon icon={faCoins} /> Monedas / Paises </h1>
      <p>Selecciona una moneda base:</p>
      <DropdownBaseCurrency onSelectCurrency={handleBaseCurrencyChange} />

      {errorMessage && <p className="text-danger">{errorMessage}</p>}

      <h2 className='main-title' >Resultados de la conversión:</h2>
      <table className="table_convert table table-bordered">
        <thead>
          <tr>
            <th>Moneda</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {conversionResults.map(([currency, value]) => (
            <tr key={currency}>
              <td>{currency}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default CurrencySearchCountry;
