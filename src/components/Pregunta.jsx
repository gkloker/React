import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Error from "./Error";

const Pregunta = ({ setPresupuesto, setRestante, setMostrarPregunta}) => {

	// definimos state
	const [cantidad, setCantidad] = useState(0);
	const [error, setError] = useState(false); 

	// funcion para el presupuesto
	const validarPresupuesto = e => {
		setCantidad( parseInt(e.target.value));
	}

	// subtmit para definir el presupuesto
	const agregarPresupuesto = e => {
		e.preventDefault();

		// validar presupuesto
		if(cantidad < 1 || isNaN(cantidad) ) {
			setError(true);
			return;
		}

		// si se pasa la validacion
		setError(false);
		setPresupuesto(cantidad);
		setRestante(cantidad);
		setMostrarPregunta(false);
	}

	return (
		<Fragment>
			<h2>Coloca tu prespuesto</h2>

			{ error ? <Error mensaje="El presupuesto es Incorrecto" /> : null }

			<form
				onSubmit={agregarPresupuesto}
			>
				<input 
					type="text"
					className="u-full-width"
					placeholder="Tu presupuesto"
					onChange={validarPresupuesto}
				/>
				<input 
					type="submit"
					className="button-primary u-full-width"
					value="Definir presupuesto"
				/>
			</form>
		</Fragment>
	);
}

Pregunta.propTypes = {
	setPresupuesto: PropTypes.func.isRequired,
	setRestante: PropTypes.func.isRequired,
	setMostrarPregunta: PropTypes.func.isRequired
}

export default Pregunta;