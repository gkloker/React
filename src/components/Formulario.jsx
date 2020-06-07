import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Error from "./Error";


const Formulario = ({setGasto, setCrearGasto}) => {
	const [nombre, setNombre] = useState('');
	const [cantidad, setCantidad] = useState(0);
	const [error, setError] = useState(false); 

	// cuando el usuario agrega un gasto
	const agregarGasto = e => {
		e.preventDefault();

		// validar
		if(cantidad < 1 || isNaN(cantidad) || nombre.trim() === '') {
			setError(true);
			return;
		}
		setError(false);

		const gasto = {
			nombre, 
			cantidad, 
			id: shortid.generate()
		}

		// pasar gastos al componente principal
		setGasto(gasto);
		setCrearGasto(true)

		// resetear el form
		setNombre('');
		setCantidad(0);

	}

	return (
		<form
			onSubmit={agregarGasto}
		>
			<h2>Agregar tus gastos</h2>

			{ error ? <Error mensaje="Ambos campos son obligatorios o Presupuesto Incorrecto" /> : null }

			<div className-="campo">
				<label>Nombre Gasto</label>
				<input 
					type="text"
					className="u-full-width"
					placeholder="Ej. Transporte"
					value={nombre}
					onChange={e => setNombre(e.target.value)}
				/>
			</div>

			<div className-="campo">
				<label>Cantidad Gasto</label>
				<input 
					type="number"
					className="u-full-width"
					placeholder="Ej. 300"
					value={cantidad}
					onChange={e => setCantidad(parseInt(e.target.value))}
				/>
			</div>

			<input 
				type="submit"
				className="button-primary u-full-width"
				value="Agregar Gasto"
			/>
		</form>
	);
}
 
Formulario.propTypes = {
	setGasto: PropTypes.func.isRequired,
	setCrearGasto: PropTypes.func.isRequired
}

export default Formulario;