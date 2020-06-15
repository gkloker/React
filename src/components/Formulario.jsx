import React, {useState} from "react";
import Error from "./Error";
import PropTypes from 'prop-types';

const Formulario = ({search, setSearch, setConsult}) => {

  const [error, setError] = useState(false);

  // extraer la ciudad y el pais
  const {city, country} = search;

  // funcion para colocar los elementos en el state
  const handleChange = e => {
    // actualizar el state
    setSearch({
      ...search,
      [e.target.name]: e.target.value
    });
  }

  // cuando el usuario da submit al form
  const handleSubmit = e => {
    e.preventDefault();

    //validar
    if (city.trim() === '' || country.trim() === '') {
      setError(true);
      return;
    }
    setError(false);

    // pasar estado al componente principal
    setConsult(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      {error ? <Error message="Ambos campos son obligatorios"/> : null}

      <div className="input-field col s12">
        <input
          type="text"
          name="city"
          id="city"
          value={city}
          onChange={handleChange}
        />
        <label htmlFor="city">City: </label>
      </div>

      <div className="input-field col s12">
        <select
          name="country"
          id="country"
          value={country}
          onChange={handleChange}
        >
          <option value="">-- Select country --</option>
          <option value="US">Estados Unidos</option>
          <option value="MX">México</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">España</option>
          <option value="PE">Perú</option>
        </select>
        <label htmlFor="country">Country: </label>
      </div>

      <div className="input-field col s12">
        <input
          type="submit"
          value="Search Clima"
          className="waves-effect waves-light btn-large btn-block yellow accent-4"
        />
      </div>
    </form>
  );
}

Formulario.propTypes = {
  search: PropTypes.object.isRequired,
  setSearch: PropTypes.func.isRequired,
  setConsult: PropTypes.func.isRequired
}

export default Formulario;