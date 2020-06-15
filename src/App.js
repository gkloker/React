import React, {Fragment, useState, useEffect} from 'react';
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {

  // state del formulario
  const [search, setSearch] = useState({
    city: '',
    country: ''
  });
  const [consult, setConsult] = useState(false);
  const [result, setResult] = useState({});
  const [error, setError] = useState(false);

  const {city, country} = search;

  useEffect(() => {
    const consultAPI = async () => {
      if(consult) {
        const appId = '4be39ef11a993128000c1e0953156fee';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;
        const answer = await fetch(url);
        const result = await answer.json();

        setResult(result);
        setConsult(false);

        // detectar si los resultados son correctos de la busqueda
        if (result.cod === "404") {
          setError(true)
        } else {
          setError(false);
        }
      }
    }
    consultAPI();
    // slint-disable-next-line
  }, [consult]);

  return (
    <Fragment>
      <Header
        title='Clima React App'
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                search={search}
                setSearch={setSearch}
                setConsult={setConsult}
              />
            </div>
            <div className="col m6 s12">
              {error ?
                <Error message="No hay resultados"/> :
                <Clima
                  result={result}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
