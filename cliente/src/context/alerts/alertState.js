import React, { useReducer } from 'react';
import AlertReducer from './alertReducer';
import AlertContext from './alertContext';
import {
  SHOW_ALERT,
  HIDE_ALERT
} from "../../types";

const AlertState = props => {
  const initState = {
    alert: null
  }

  const [ state, dispatch ] = useReducer(AlertReducer, initState);

  // Method show alert
  const showAlert = (msg, cat) => {
    dispatch({
      type: SHOW_ALERT,
      payload: {
        msg,
        cat
      }
    });

    // After 5 seconds clean alert
    setTimeout(() => {
      dispatch({
        type: HIDE_ALERT
      })
    }, 5000);
  }

  return (
    <AlertContext.Provider
      value={{
        alert: state.alert,
        showAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState;