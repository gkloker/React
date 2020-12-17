import React, {useContext, useEffect} from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Project from "./Project";
import ProjectContext from "../../context/projects/projectContext";
import AlertContext from '../../context/alerts/alertContext';

const ListProject = () => {
  //get state projects
  const projectsContext = useContext(ProjectContext);
  const {
    msg,
    projects,
    getProjects
  } = projectsContext;

  const alertContext = useContext(AlertContext);
  const {
    alert,
    showAlert
  } = alertContext;

  //Get projects when load component
  useEffect(() => {
    if (msg) {
      showAlert(msg.msg, msg.cat);
    }

    getProjects();
    // eslint-disable-next-line
  }, [msg]);

  // Review projects
  if (projects.length === 0) return <p>Don't have project, start one</p>

  return(
    <ul className="listado-proyectos">
      { alert ? (<div className={`àlerta ${alert.cat}`}>{alert.msg}</div>) : null }
      <TransitionGroup>
        {projects.map(project => (
          <CSSTransition
            key={project._id}
            timeout={200}
            classNames="projecto"
          >
            <Project
              project={project}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
}

export default ListProject;