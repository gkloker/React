import React, { useContext } from "react";
import projectContext from "../../context/projects/projectContext";
import taskContext from '../../context/tasks/taskContext';

const Project = ({project}) => {
  // Get state projects
  const projectsContext = useContext(projectContext);
  const { currentProject } = projectsContext;

  // Get function context of task
  const tasksContext = useContext(taskContext);
  const { getTasks } = tasksContext;

  // Method to add current project
  const selectProject = id => {
    currentProject(id);
    getTasks(id); // Filter tasks when clicked
  }

  return(
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => selectProject(project._id)}
      >{project.name}</button>
    </li>
  );
}

export default Project;