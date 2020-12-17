import React, { useContext, useState, useEffect } from "react";
import projectContext from "../../context/projects/projectContext";
import taskContext from '../../context/tasks/taskContext';

const FormTask = () => {
  // Extract if project is active
  const projectsContext = useContext(projectContext);
  const { project } = projectsContext;

  // Get function context of task
  const tasksContext = useContext(taskContext);
  const {
    addTask,
    validateTask,
    getTasks,
    taskSelected,
    updateTask,
    taskError,
    cleanTask
  } = tasksContext;

  // Effect to detect if any task is select
  useEffect(() => {
    if (taskSelected !== null) {
      setTask(taskSelected);
    } else {
      setTask({
        name: ""
      })
    }
  }, [taskSelected]);

  // State form
  const [task, setTask] = useState({
    name: ''
  });

  // If project unselected
  if(!project) return null;

  // Array destructuring to extract current project
  const [ currentProject ] = project;

  // Read values form
  const handleChange = e => {
    setTask({
      ...task,
      [e.target.name] : e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault();

    // Validate
    if (task.name.trim() === "") {
      validateTask();
      return;
    }

    // Is edition or new task
    if (taskSelected === null) {
      // Add new taks to state
      task.project =  currentProject._id;
      addTask(task);
    } else {
      // Edit current task
      updateTask(task);

      // Clean task
      cleanTask();
    }

    // Get and filter current tasks
    getTasks(currentProject.id);

    // Restart form
    setTask({
      name: ""
    })
  }

  return(
    <div className="formulario">
      <form
        onSubmit={onSubmit}
      >
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Name Task"
            name="name"
            value={task.name}
            onChange={handleChange}
          />
        </div>

        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={taskSelected ? "Edit Task" : "Add Task"}
          />
        </div>
      </form>

      {taskError ? <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      : null}
    </div>
  );
}

export default FormTask;