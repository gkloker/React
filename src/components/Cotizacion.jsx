import React from 'react';
import styled from "@emotion/styled";

const ResultadoDiv = styled.div `
	color:#FFF;
	font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p `
	font-size: 18px;

	span {
		font-weight: bold;
	}
`;

const Precio = styled.p `
	font-size: 30px;

	span {
		font-weight: bold;
	}
`;

const Cotizacion = ({result}) => {
	// si el objeto llega vacio no se ejecuta nada
	if(Object.keys(result).length === 0) return null;

	return ( 
		<ResultadoDiv>
			<Precio>El precio es: <span>{result.PRICE}</span></Precio>
			<Info>El precio mas alto del dia: <span>{result.HIGHDAY}</span></Info>
			<Info>El precio mas bajo del dia: <span>{result.LOWDAY}</span></Info>
			<Info>Variacion ultimas 24 horas: <span>{result.CHANGEPCT24HOUR}</span></Info>
			<Info>Ultima actualizacion: <span>{result.LASTUPDATE}</span></Info>
		</ResultadoDiv>
	);
}
 
export default Cotizacion;