import React, {createContext, useState, useEffect} from "react";
import axios from 'axios';

// Crear el Context
export const CategoriesContext = createContext();

// Provider es donde se encuentran las funciones y state
const CategoriasProvider = (props) => {

  // Crear el state del Context
  const [categories, setCategories] = useState([]);

  // Ejecutar el llamado a la API
  useEffect(() => {
    const getCategories = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

      const categories = await axios.get(url);
      setCategories(categories.data.drinks);
    }
    getCategories();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        categories
      }}
    >
      {props.children}
    </CategoriesContext.Provider>
  )
}

export default CategoriasProvider;