import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/authentication/authContext';

const NewAccount = (props) => {

  const alertContext = useContext(AlertContext);
  const {
    alert,
    showAlert
  } = alertContext;

  const authContext = useContext(AuthContext);
  const {
    msg,
    authenticated,
    userRegister
  } = authContext;

  useEffect(() => {
    if (authenticated) {
      props.history.push('/projects');
    }

    if (msg) {
      showAlert(msg.msg, msg.cat);
    }
    // eslint-disable-next-line
  }, [msg, authenticated, props.history]); // Dependencies

  // State Login
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  });

  // User
  const {
    name,
    email,
    password,
    confirm
  } = user;

  const onChange = e => {
    setUser({
      ...user, // get copy of user
      [e.target.name] : e.target.value
    })
  }

  // When user log in
  const onsubmit = e => {
    e.preventDefault();

    // Validate empty fields
    if ( name.trim() === '' || email.trim() === '' || password.trim() === '' || confirm.trim() === '' ) {
      showAlert('All fields are required', 'alerta-error');
      return;
    }

    // Validate password min 6 char
    if ( password.length < 6 ) {
      showAlert('Password minimum 6 characters','alerta-error');
      return;
    }

    // Check that the two passwords are the same
    if ( password !== confirm ) {
      showAlert('The two passwords aren´t the same','alerta-error');
      return;
    }

    userRegister({
      name,
      email,
      password
    });
  }

  return(
    <div className="form-usuario">
      {alert ? ( <div className={`alerta ${alert.cat}`}>{alert.msg}</div> ): null}
      <div className="contenedor-form sombra-dark">
        <h1>Get Account</h1>

        <form
          onSubmit={onsubmit}
        >
          <div className="campo-form">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={name}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={email}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="confirm">Confirm Password</label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              placeholder="Repeat password"
              value={confirm}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Register"
            />
          </div>
        </form>

        <Link to={'/'} className="enlace-cuenta">
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default NewAccount;