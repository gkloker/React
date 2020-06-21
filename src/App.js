import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import imagen from "./cryptomonedas.png";
import Formulario from "./components/Formulario";
import Cotizacion from "./components/Cotizacion";
import Spinner from "./components/Spinner";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

function App() {
  const [money, saveMoney] = useState("");
  const [cripto, saveCripto] = useState("");
  const [result, saveResult] = useState({});
  const [upload, setUpload] = useState(false);

  useEffect(() => {
    const quoteCripto = async () => {
      // evitamos la ejecucion la primera vez
      if (money === "") return;

      // consultar la API para obtener la cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${money}`;
      const result = await axios.get(url);

      // mostrar el spinner
      setUpload(true);

      // ocultar el spinner y mostrar el resultado
      setTimeout(() => {
        // cambiar el estado de cargando
        setUpload(false);

        // guardar cotizacion
        saveResult(result.data.DISPLAY[cripto][money]);
      }, 2000);
    };
    quoteCripto();
  }, [money, cripto]);

  // mostrar spinner o resultado
  const component = upload ? <Spinner /> : <Cotizacion result={result} />;

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="Imagen Cripto" />
      </div>
      <div>
        <Heading>Cotizador de Criptomonedas</Heading>
        <Formulario saveMoney={saveMoney} saveCripto={saveCripto} />
        {component}
      </div>
    </Contenedor>
  );
}

export default App;
