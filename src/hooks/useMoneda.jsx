import React, { Fragment , useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label `
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-transform: uppercase;
  font-width: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select `
  width: 100%;
  display: block;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
`;

const useMoneda = (label, stateInicial, options) => {
  // State de nuestro custom hook
  const [state, setState] = useState(stateInicial);

  const SelectMoney = () => (
    <Fragment>
      <Label>{label}</Label>
      <Select
        onChange={ e => setState(e.target.value)}
        value={state}
      >
        <option value="">-- Seleccione --</option>
        {options.map(option => (
          <option key={option.cod} value={option.cod}>{option.name}</option>
        ))}
      </Select>
    </Fragment>
  );

  // return state, interfaz y fn que modifica el state
  return [state, SelectMoney, setState];
}

export default useMoneda;