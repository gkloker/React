import React, {useContext, useState} from "react";
import { ModalContext } from "../context/ModalContext";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import {light} from "@material-ui/core/styles/createPalette";

function getModalStyle() {
  const top = 50 ;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Receta = ({recipe}) => {

  // Configuracion del modal del material ui
  const [ modalSyle ] = useState(getModalStyle);
  const [ open, setOpen ] = useState(false);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  // Extraer los valores del context
  const { infoRecipe,  setIdRecipe, saveRecipe } = useContext(ModalContext);

  const { idDrink, strDrink, strDrinkThumb } = recipe;

  // Muestra y formatea los ingredientes
  const showIngredients = infoRecipe => {
    let ingredients = [];
    for (let i = 1; i < 16; i++) {
      if (infoRecipe[`strIngredient${i}`]) {
        ingredients.push(
          <li>
            { infoRecipe[`strIngredient${i}`] } { infoRecipe[`strMeasure${i}`] }
          </li>
        )
      }
    }

    return ingredients;
  }

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{strDrink}</h2>

        <img src={strDrinkThumb} className="card-img-top" alt={`Image de ${strDrink}`}/>

        <div className="card-body">
          <button
            type="button"
            className="btn btn-block btn-primary"
            onClick={() => {
              setIdRecipe(idDrink);
              handleOpen();
            }}
          >
            Ver receta
          </button>

          <Modal
            open={open}
            onClose={() => {
              setIdRecipe(null);
              saveRecipe({});
              handleClose();
            }}
          >
            <div style={modalSyle} className={classes.paper}>
              <h2>{infoRecipe.strDrink}</h2>
              <h3 className="mt-4">Instrucciones</h3>
              <p>{infoRecipe.strInstructions}</p>
              <img className="img-fluid my-4" src={infoRecipe.strDrinkThumb}/>

              <h3>Ingredientes y Cantidades</h3>
              <ul>
                { showIngredients(infoRecipe) }
              </ul>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Receta;