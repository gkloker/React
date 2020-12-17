import React, { Fragment, useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Task from "./Task";
import projectContext from "../../context/projects/projectContext";
import taskContext from '../../context/tasks/taskContext';

const ListTasks = () => {
  // Get state projects initials
  const projectsContext = useContext(projectContext);
  const {
    project,
    removeProject
  } = projectsContext;

  // Get tasks of the project
  const tasksContext = useContext(taskContext);
  const { tasksProject } = tasksContext;

  // If project unselected
  if(!project) return <h2>Select project</h2>;

  // Array destructuring to extract current project
  const [ currentProject ] = project;

  // Remove project
  const onClickRemove = () => {
    removeProject(currentProject._id);
  }

  return(
    <Fragment>
      <h2>Project: {currentProject.name}</h2>
      <ul className="listado-tareas">
        {tasksProject.length === 0
          ? (<li className="tarea"><p>No hay tareas</p></li>)
          :
          <TransitionGroup>
            {tasksProject.map(task => (
              <CSSTransition
                key={task.id}
                timeout={200}
                classNames="tarea"
              >
                <Task
                  task={task}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        }
      </ul>

      <button
        type="button"
        className="btn btn-eliminar"
        onClick={onClickRemove}
      >Remove Project &times;</button>
    </Fragment>
  );
}

export default ListTasks;