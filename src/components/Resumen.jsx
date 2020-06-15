import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { primerMayuscula } from "../helper";

const ContenedorResume = styled.div `
  padding: 1rem;
  text-align: center;
  background-color: #00838F;
  color: #FFF;
  margin-top: 1rem;
`;

const Resumen = ({data}) => {

  const {brand, year, plan} = data;

  if (brand.trim() === '' || year.trim() === '' || plan.trim() === '') {
    return null;
  }

  return (
    <ContenedorResume>
      <h2>Resument de cotizacion</h2>
      <ul>
        <li>Marca: {primerMayuscula(brand)}</li>
        <li>Plan: {primerMayuscula(plan)}</li>
        <li>Año del auto: {year}</li>
      </ul>
    </ContenedorResume>
  );
}

Resumen.propTypes = {
  data: PropTypes.object.isRequired
}

export default Resumen;