import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/cita";

function App() {
  // citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  // arreglo de citas
  const [citas, setCitas] = useState(citasIniciales);

  // useEffect realizar operaciones cuando el state cambia
  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas, citasIniciales]);

  // funcion para tomar las citas actuales y actualizarlas
  const crearCita = (cita) => {
    setCitas([
      ...citas, // copiamos las citas que hay
      cita, // agregamos la nueva cita
    ]);
  };

  // funcion para eliminar una cita
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    setCitas(nuevasCitas);
  };

  // mensaje hay o no hay citas
  const titulo = citas.length === 0 ? "No hay citas" : "Administrar citas";

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
