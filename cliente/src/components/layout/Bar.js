import React, { useContext, useEffect } from "react";
import AuthContext from './../../context/authentication/authContext';

const Bar = () => {
  const authContext = useContext(AuthContext);
  const { user, userLogin, userLogout } = authContext;

  useEffect(() => {
    userLogin();
    // eslint-disable-next-line
  }, []);

  return(
    <header className="app-header">
      {user ? <p className="nombre-usuario">Hola <span>{user.name}</span></p> : null}
      <nav className="nav-principal">
        <button
          className="btn btn-blank cerrar-sesion"
          onClick={() => userLogout()}
        >
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Bar;