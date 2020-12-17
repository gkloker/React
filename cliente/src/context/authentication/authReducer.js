import {
  REGISTER_SUCCESSFUL,
  REGISTER_ERROR,
  GET_USER,
  LOGIN_SUCCESSFUL,
  LOGIN_ERROR,
  LOGOUT
} from "../../types";
// eslint-disable-next-line
export default (state, action) => {
  switch(action.type) {
    case LOGIN_SUCCESSFUL:
    case REGISTER_SUCCESSFUL:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        authenticated: true,
        msg: null,
        loading: false
      }
    case LOGIN_ERROR:
    case REGISTER_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        authenticated: null,
        msg: action.payload,
        loading: false
      }
    case GET_USER:
      return {
        ...state,
        authenticated: true,
        user: action.payload,
        loading: false
      }
    default:
      return state;
  }
}