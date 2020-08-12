import React from 'react';
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListaRecetas from "./components/ListaRecetas";

import CategoriasProvider from "./context/CategoriaContext";
import RecipeProvider from "./context/RecetasContext";
import ModalProvider from "./context/ModalContext";

function App() {
  return (
    <CategoriasProvider>
      <RecipeProvider>
        <ModalProvider>
          <Header />

          <div className="container mt-5">
            <div className="row">
              <Formulario />
            </div>

            <ListaRecetas />
          </div>

        </ModalProvider>
      </RecipeProvider>
    </CategoriasProvider>
  );
}

export default App;
