import React, { Fragment, useContext, useState } from "react";
import projectContext from "../../context/projects/projectContext";

const NewProject = () => {
  // Get state form
  const projectsContext = useContext(projectContext);
  const {
    form,
    errorForm,
    showForm,
    addProject,
    showError
  } = projectsContext;

  // State for project
  const [project, setProject] = useState({
    name: ''
  });

  const {name} = project;

  //Read content from input
  const onChangeProject = e => {
    setProject({
      ...project,
      [e.target.name] : e.target.value
    })
  }

  // Submit user project
  const onSubmitProject = e => {
    e.preventDefault();

    // Validate project
    if(name === "") {
      showError();
      return;
    }

    // Add to state
    addProject(project);

    // Reload form
    setProject({
      name: ''
    })
  }

  return(
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={() => showForm()}
      >New Project</button>

      {form
        ? (
          <form
            className="formulario-nuevo-proyecto"
            onSubmit={onSubmitProject}
          >
            <input
              type="text"
              className="input-text"
              placeholder="Name Project"
              name="name"
              value={name}

              onChange={onChangeProject}
            />

            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Add Project"
            />
          </form>
          )
        : null }

      {errorForm ?
        <p className="mensaje error">El nombre del proyecto es obligatorio</p>
      : null }
    </Fragment>
  );
}

export default NewProject;