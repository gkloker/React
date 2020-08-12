import React, {createContext, useState, useEffect} from "react";
import axios from 'axios';

export const RecipeContext = createContext();

const RecipeProvider = (props) => {

  const [recipes, saveRecipes] = useState([]);
  const [search, setRecipes] = useState({
    name:'',
    category:''
  });
  const [consult, setConsult] = useState(false);

  const { name, category } = search;

  useEffect(() => {
    if (consult) {
      const getRecipes = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}&=${category}`;

        const result = await axios.get(url);

        // Guarda el resultado de la busqueda en el state
        saveRecipes(result.data.drinks);
      }
      getRecipes();
    }
  }, [search]);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        setRecipes,
        setConsult
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
}

export default RecipeProvider;