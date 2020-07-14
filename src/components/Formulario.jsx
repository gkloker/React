import React, {useState} from "react";
import Error from "./Error";
import PropTypes from 'prop-types';

const Formulario = ({setSearch}) => {

  const [term, setTerm] = useState('');
  const [error, setError] = useState(false);

  const searchImages = e => {
    e.preventDefault();

    // validar
    if(term.trim() === '') {
      setError(true);
      return;
    }
    setError(false);

    // enviar el termino de busqueda hacia el componente principal
    setSearch(term);
  }

  return (
    <form
      onSubmit={searchImages}
    >
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Buscar imagen, ejemplo: futbol o cafe"
            onChange={ e => setTerm(e.target.value)}
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          />
        </div>
      </div>

      { error ? <Error message="Agrega un termino de busqueda" /> : null }
    </form>
  );
}

Formulario.propTypes = {
  setSearch: PropTypes.string.isRequired
}

export default Formulario;