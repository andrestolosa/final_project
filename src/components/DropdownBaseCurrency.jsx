// DropdownBaseCurrency.jsx

import React from 'react';

const DropdownBaseCurrency = ({ onSelectCurrency }) => {
  const currencies = [
    { code: 'USD', name: 'Dólar estadounidense' },
    { code: 'COP', name: 'Peso colombiano' },
    { code: 'AUD', name: 'Dólar australiano' },
    { code: 'CAD', name: 'Dólar canadiense' },
    { code: 'EUR', name: 'Euro' },
    { code: 'MXN', name: 'Peso mexicano' },
  ];

  const handleCurrencyChange = (event) => {
    const selectedCurrency = event.target.value;
    onSelectCurrency(selectedCurrency);
  };

  return (
    <select className="form-select rounded shadow mt-4 mb-4" onChange={handleCurrencyChange}>
    {currencies.map((currency) => (
      <option key={currency.code} value={currency.code}>
        {currency.name}
      </option>
    ))}
  </select>
  
  );
};

export default DropdownBaseCurrency;
