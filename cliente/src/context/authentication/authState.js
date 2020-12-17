import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import clientAxios from '../../config/axios';
import tokenAuth from '../../config/token';
import {
  REGISTER_SUCCESSFUL,
  REGISTER_ERROR,
  GET_USER,
  LOGIN_SUCCESSFUL,
  LOGIN_ERROR,
  LOGOUT
} from "../../types";

const AuthState = props => {
  const initState = {
    token: localStorage.getItem('token'),
    authenticated: null,
    user: null,
    msg: null,
    loading: true
  }

  const [ state, distpach ] = useReducer(AuthReducer, initState);

  // Register user
  const userRegister = async data => {
    try {
      const answer = await clientAxios.post('/api/users', data);

      distpach({
        type: REGISTER_SUCCESSFUL,
        payload: answer.data
      });

      // Get user
      userLogin();

    } catch(error) {
      const alert = {
        msg: error.response.data.msg,
        cat: 'alerta-error'
      }

      distpach({
        type: REGISTER_ERROR,
        payload: alert
      });
    }
  }

  // Return user authenticated
  const userLogin = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      tokenAuth(token);
    }

    try {
      const answer = await clientAxios.get('/api/auth');
      distpach({
        type: GET_USER,
        payload: answer.data.user
      });

    } catch(error) {
      console.log(error.response);
      distpach({
        type:LOGIN_ERROR
      })
    }
  }

  // When user login
  const initSession = async data => {
    try {
      const answer = await clientAxios.post('/api/auth', data);
      distpach({
        type: LOGIN_SUCCESSFUL,
        payload: answer.data
      });

      // Get user
      userLogin();

    } catch(error) {
      console.log(error.response.data.msg);
      const alert = {
        msg: error.response.data.msg,
        cat: 'alerta-error'
      }

      distpach({
        type: LOGIN_ERROR,
        payload: alert
      });
    }
  }

  // Close session from user
  const userLogout = () => {
    distpach({
      type: LOGOUT
    })
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        msg: state.msg,
        loading: state.loading,
        userRegister,
        userLogin,
        initSession,
        userLogout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;