import React, { useState } from 'react';
import Header from './components/Header';
import Formulario from "./components/Formulario";
import Resumen from "./components/Resumen";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";

import styled from "@emotion/styled";

const Contenedor = styled.div `
  max-width: 600px;
  margin: 0 auto;
`;

const ContenderFormulario = styled.div `
  background-color: #FFF;
  padding: 3rem;
`;

function App() {

  const [resume, setResume] = useState({
    cotizacion: 0,
    data: {
      brand: '',
      year: '',
      plan: ''
    }
  });

  const [upload, setUpload] = useState(false);

  // extraer datos
  const {cotizacion, data} = resume;

  return (
    <Contenedor>
      <Header
        title='Cotizador de seguros'
      />
      <ContenderFormulario>
        <Formulario
          setResume={setResume}
          setUpload={setUpload}
        />

        {upload ? <Spinner/> : null}

        <Resumen
          data={data}
        />

        { !upload ?
          <Resultado
            cotizacion={cotizacion}
          /> :
          null
        }

      </ContenderFormulario>
    </Contenedor>
  );
}

export default App;
