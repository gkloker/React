import {
  GET_EDIT_PRODUCTS,
  EDIT_PRODUCTS,
  EDIT_PRODUCTS_SUCCESS,
  EDIT_PRODUCTS_ERROR
} from '../types';
import clientAxios from "../config/axios";

// Get product to edit
export function getEditProductAction (product) {
  return async (dispatch) => {
    dispatch(getEditProduct(product));
  }
}
const getEditProduct = (product) => ({
  type: GET_EDIT_PRODUCTS,
  payload: product
})

export function editProductAction(product) {
  return async (dispatch) => {
    dispatch(editProduct(product));

    try {
      await clientAxios.put(`/products/${product.id}`, product);

      dispatch(editProductSuccess(product))
    } catch (error) {
      console.log(error);

      dispatch(editProductError());
    }
  }
}

const editProduct = () => ({
  type: EDIT_PRODUCTS,
})

// Edit from database
const editProductSuccess = (product) => ({
  type: EDIT_PRODUCTS_SUCCESS,
  payload: product
})

// If there are an error
const editProductError = () => ({
  type: EDIT_PRODUCTS_ERROR,
  payload: true
})