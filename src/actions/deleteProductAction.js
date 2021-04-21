import {
  DELETE_PRODUCTS,
  DELETE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_ERROR
} from '../types';
import clientAxios from "../config/axios";
import Swal from "sweetalert2";

// Delete products
export function deleteProductAction (id) {
  return async (dispatch) => {
    dispatch(deleteProduct(id));
    try {
      await clientAxios.delete(`/products/${id}`);

      dispatch(deleteProductSuccess());

      // Alert
      Swal.fire({
        title: 'Deleted!',
        text: 'Your file has been deleted.',
        icon: 'success'
      })

    } catch (error) {
      console.log(error);

      dispatch(deleteProductError(error));
    }
  }
}

const deleteProduct = (id) => ({
  type: DELETE_PRODUCTS,
  payload: id
})

// Delete product from database
const deleteProductSuccess = () => ({
  type: DELETE_PRODUCTS_SUCCESS
})

// If there are an error
const deleteProductError = () => ({
  type: DELETE_PRODUCTS_ERROR,
  payload: true
})
