import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';

// Crear el context
export const ModalContext = createContext();

const ModalProvider = (props) => {

  // State del provider
  const [idRecipe, setIdRecipe] = useState(null);
  const [infoRecipe, saveRecipe] = useState({});

  // Cuando tenemos la receta, llamamos a la api
  useEffect(() => {
    const getRecipe = async () => {
      if (!idRecipe) return;

      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;

      const result = await axios.get(url);

      saveRecipe(result.data.drinks[0]);
    }
    getRecipe();
  },[idRecipe]);

  return (
    <ModalContext.Provider
      value={{
        infoRecipe,
        setIdRecipe,
        saveRecipe
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;