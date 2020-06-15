import React from "react";
import PropTypes from 'prop-types';

const Clima = ({result}) => {

  // extraer los valores
  const {name, main} = result;

  if(!name) return null;

  // grados kelvin
  const kelvin = 273.15;

  return (
    <div className="card-panel white col s12">
      <h2>El clima de {name} es: </h2>
      <p className="temperatura">
        {parseFloat(main.temp - kelvin, 10).toFixed(2)} <span> &#x2103;</span>
      </p>
      <p> Temp max:
        {parseFloat(main.temp_max - kelvin, 10).toFixed(2)} <span> &#x2103;</span>
      </p>
      <p> Temp min:
        {parseFloat(main.temp_min - kelvin, 10).toFixed(2)} <span> &#x2103;</span>
      </p>
    </div>
  );
}

Clima.propTypes = {
  result: PropTypes.object.isRequired
}

export default Clima;