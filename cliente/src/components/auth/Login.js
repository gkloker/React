import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/authentication/authContext';

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const {
    alert,
    showAlert
  } = alertContext;

  const authContext = useContext(AuthContext);
  const {
    msg,
    authenticated,
    initSession
  } = authContext;

  useEffect(() => {
    if (authenticated) {
      props.history.push('/projects');
    }

    if (msg) {
      showAlert(msg.msg, msg.cat);
    }
    // eslint-disable-next-line
  }, [msg, authenticated, props.history]);

  // State Login
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  // User
  const {
    email,
    password
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
    if (email.trim() === '' || password.trim() === '') {
      showAlert('All fields are required', 'alerta-error');
    }

    initSession({ email, password });
  }

  return(
    <div className="form-usuario">
      {alert ? ( <div className={`alerta ${alert.cat}`}>{alert.msg}</div> ): null}
      <div className="contenedor-form sombra-dark">
        <h1>Log In</h1>

        <form
          onSubmit={onsubmit}
        >
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
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Login"
            />
          </div>
        </form>
        
        <Link to={'/new-account'} className="enlace-cuenta">
          Get Account
        </Link>
      </div>
    </div>
  );
}

export default Login;