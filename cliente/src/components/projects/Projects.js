import React, { useContext, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import Bar from "../layout/Bar";
import FormTask from "../Tasks/FormTask";
import ListTasks from "../Tasks/ListTasks";
import AuthContext from '../../context/authentication/authContext';

const Projects = () => {
  const authContext = useContext(AuthContext);
  const { userLogin } = authContext;

  useEffect(() => {
    userLogin();
    // eslint-disable-next-line
  }, []);

  return(
    <div className="contenedor-app">
      <Sidebar />

      <div className="seccion-principal">
        <Bar />

        <main>
          <FormTask />
          <div className="contenedor-tareas">
            <ListTasks />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Projects;