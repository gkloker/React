import {
    GET_PRODUCTS,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR
} from '../types';
import clientAxios from "../config/axios";

// Get products
export function getProductAction () {
    return async (dispatch) => {
        dispatch(getProducts());

        try {
            // Consult API
            const rest = await clientAxios.get('/products');

            // If it is ok, update the state
            dispatch(getProductsSuccess(rest.data))
        } catch (error) {
            console.log(error);
            dispatch(getProductsError(error))
        }
    }
}


const getProducts = () => ({
    type: GET_PRODUCTS
})

// If products gets from database
const getProductsSuccess = (products) => ({
    type: GET_PRODUCTS_SUCCESS,
    payload: products
})

// If there are an error
const getProductsError = () => ({
    type: GET_PRODUCTS_ERROR,
    payload: true
})