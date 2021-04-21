import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  DELETE_PRODUCTS,
  DELETE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_ERROR,
  GET_EDIT_PRODUCTS,
  EDIT_PRODUCTS_SUCCESS,
  EDIT_PRODUCTS_ERROR
} from '../types';

// Any redurcer has its own state
const initialState = {
  products: [],
  error: null,
  loading: false,
  productDelete: null,
  productEdit: null
}

export default function (state = initialState, action) {
  switch(action.type) {
    case ADD_PRODUCT:
    case GET_PRODUCTS:
      return {
        ...state,
        loading: true
      }
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload]
      }
    case ADD_PRODUCT_ERROR:
    case GET_PRODUCTS_ERROR:
    case DELETE_PRODUCTS_ERROR:
    case EDIT_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload
      }
    case DELETE_PRODUCTS:
      return {
        ...state,
        productDelete: action.payload
      }
    case DELETE_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: state.products.filter( product => product.id !== state.productDelete),
        productDelete: null
      }
    case GET_EDIT_PRODUCTS:
      return {
        ...state,
        productEdit: action.payload
      }
    case EDIT_PRODUCTS_SUCCESS:
      return {
        ...state,
        productEdit: null,
        products: state.products.map( product =>
          product.id === action.payload.id ?
            product = action.payload :
            product
         )
      }
    default:
      return state;
  }
}