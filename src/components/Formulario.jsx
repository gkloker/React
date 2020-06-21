import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import axios from 'axios';
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import Error from "./Error";


const Boton = styled.input `
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66A2FE;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #FFF;
  transition: background-color .3s ease;
  
  &:hover {
    background-color: #326AC0;
    cursor:pointer;
  }
`

const Formulario = ({saveMoney, saveCripto}) => {

  // state del listado de criptomonedas
  const [listcripto, setCripto] = useState([]);
  const [error, setError] = useState(false);

  const MONEDAS = [
    { cod: 'USD', name: 'Dolar'},
    { cod: 'EUR', name: 'Euro'},
    { cod: 'GBP', name: 'Libra'}
  ]
  // utilizar useMoneda
  const [money, SelectMoney] = useMoneda('Choose your money', '', MONEDAS);

  // utilizar useCriptomoneda
  const [cripto, SelectCripto] = useCriptomoneda('Choose your Criptomoney', '', listcripto);

  // ejecutar llamado a la API
  useEffect(() => {
    const consultAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const result = await axios.get(url);

      setCripto(result.data.Data);
    }
    consultAPI();
  }, []);

  // cuando el usuario hace submit
  const quoteCurrency = e => {
    e.preventDefault();

    // validar si ambos campos estan llenos
    if(money === '' || cripto === '') {
      setError(true);
      return;
    }

    // pasar los datos al componente principal
    setError(false);
    saveMoney(money);
    saveCripto(cripto);
  }

  return (
    <form
      onSubmit={quoteCurrency}
    >
      {error ? <Error message="Todos los campos son obligatorios"/> : null}
      <SelectMoney />
      <SelectCripto />
      <Boton
        type="submit"
        value="Calcular"
      />
    </form>
  );
}

export default Formulario;