import React, { useContext } from "react";
import Receta from "./Receta";
import { RecipeContext } from "../context/RecetasContext";

const ListaRecetas = () => {

  // Extraer las recetas
  const { recipes } = useContext(RecipeContext);

  return (
    <div className="row mt-5">
      {recipes.map(recipe => (
        <Receta
          key={recipe.idDrink}
          recipe={recipe}
        />
      ))}
    </div>
  );
}

export default ListaRecetas;