import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import alertReducer from "./alertReducer";

// Method for combine reducers
export default combineReducers({
  products: productsReducer,
  alert: alertReducer
})