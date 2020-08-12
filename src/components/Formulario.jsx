import React, { useContext, useState } from "react";
import { CategoriesContext } from "../context/CategoriaContext";
import { RecipeContext } from "../context/RecetasContext";

const Formulario = () => {

  const [search, setSearch] = useState({
    name: '',
    category: ''
  });

  const { categories } = useContext(CategoriesContext);
  const { setRecipes, setConsult } = useContext(RecipeContext);

  // Funcion para leer los contenidos
  const searchData = e => {
    setSearch({
      ...search,
      [e.target.name] : e.target.value
    })
  }

  return (
    <form
      className="col-12"
      onSubmit={e => {
        e.preventDefault();
        setRecipes(search);
        setConsult(true);
      }}
    >
      <fieldset className="text-center">
        <legend>Buscar bebidas por Categoria o Ingrediente</legend>
      </fieldset>

      <div className="row mt-4">
        <div className="col-md-4">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Buscar por Ingrediente"
            onChange={searchData}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-control"
            name="category"
            onChange={searchData}
          >
            <option value="">-- Selecciona Categoria --</option>
            {categories.map(category => (
              <option
                key={category.strCategory}
                value={category.strCategory}
              >
                {category.strCategory}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <input
            type="submit"
            className="btn btn-block btn-primary"
            value="Buscar Bebidas"
          />
        </div>
      </div>
    </form>
  );
}

export default Formulario;