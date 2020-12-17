import React, { useContext } from "react";
import projectContext from "../../context/projects/projectContext";
import taskContext from '../../context/tasks/taskContext';

const Task = ({task}) => {
  // Extract if project is active
  const projectsContext = useContext(projectContext);
  const { project } = projectsContext;

  // Extract project
  const [currentProject] =  project;

  // Get tasks of the project
  const tasksContext = useContext(taskContext);
  const {
    removeTask,
    getTasks,
    updateTask,
    setCurrentTask
  } = tasksContext;

  // Method click to remove task
  const dropTask = id => {
    removeTask(id, currentProject._id);
    getTasks(currentProject.id);
  }

  // Method to modify tasks
  const changeState = task => {
    if (task.state) {
      task.state = false;
    } else {
      task.state = true;
    }
    updateTask(task);
  }

  // Edit task
  const selectTask = task => {
    setCurrentTask(task);
  }

  return(
    <li className="tarea sombra">
      <p>{task.name}</p>

      <div className="estado">
        {task.state
          ? (
              <button
                type="button"
                className="completo"
                onClick={() => changeState(task)}
              >Complete</button>
            )
          : (
              <button
                type="button"
                className="incompleto"
                onClick={() => changeState(task)}
              >Incomplete</button>
            )
        }
      </div>

      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => selectTask(task)}
        >Edit</button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => dropTask(task._id)}
        >Remove</button>
      </div>
    </li>
  );
}

export default Task;