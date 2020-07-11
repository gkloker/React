import React from "react";
import styles from "./Formulario.module.css";
import useSelect from "../hooks/useSelect";
import PropTypes from 'prop-types';

const Formulario = ({setCategory}) => {

  const OPTIONS = [
    {value: 'general', label: 'General'},
    {value: 'business', label: 'Negocios'},
    {value: 'entertainment', label: 'Entretenimiento'},
    {value: 'health', label: 'Salud'},
    {value: 'science', label: 'Ciencia'},
    {value: 'sports', label: 'Deportes'},
    {value: 'technology', label: 'Tecnologia'},
  ]

  // utilizar custom hook
  const [category, SelectNews] = useSelect('general', OPTIONS);

  // submit al form, pasar categoria a app.js
  const searchNews = e => {
    e.preventDefault();
    setCategory(category);
  }

  return (
    <div className={`row ${styles.search}`}>
      <div className="col s12 m8 offset-m2">
        <form
          onSubmit={searchNews}
        >
          <h2 className={styles.heading}>Encuentra Noticias por Categoria</h2>

          <SelectNews />

          <div className="input-field col s12">
            <input
              type="submit"
              className={`btn-large amber darken-2 ${styles.btnBlock}`}
              value="Search"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

Formulario.proptType = {
  setCategory: PropTypes.func.isRequired
}

export default Formulario;