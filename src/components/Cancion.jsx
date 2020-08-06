import React, {Fragment} from "react";

const Cancion = ({lyric}) => {

  // si no le pasamos ninguna letra que no cargue el componente
  if(lyric.length === 0) return null;

  return (
    <Fragment>
      <h2>Letra Cancion</h2>
      <p className="letra">{lyric}</p>
    </Fragment>
  );
}

export default Cancion;