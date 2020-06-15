// obtiene la diferencia de años
export function obtenerDiferenciaYear(year) {
  return new Date().getFullYear() - year;
}

// calcula el total a pagar segun la marca
export function calcularMarca(brand) {
  let incremento;

  switch (brand) {
    case 'europeo':
      incremento = 1.30;
      break;

    case 'americano':
      incremento = 1.15;
      break;

    case 'asiatico':
      incremento = 1.05;
      break;

    default:
      break;
  }

  return incremento;
}

// calcular tipo de seguro
export function obtenerPlan(plan) {
  return (plan === 'basic') ? 1.20 : 1.50;
}

// muestra la primer letra en mayuscula
export function primerMayuscula(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}