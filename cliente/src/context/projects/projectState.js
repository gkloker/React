import React, { useReducer } from "react";
import clientAxios from '../../config/axios';
import ProjectContext from "./projectContext";
import ProjectReducer from "./projectReducer";
import {
  FORM_PROJECT,
  GET_PROJECTS,
  ADD_PROYECT,
  PROJECT_ERROR,
  VALIDATE_FORM,
  CURRENT_PROJECT,
  REMOVE_PROJECT
} from "../../types";

const ProjectState = props => {

  const initState = {
    projects : [],
    form : false,
    errorForm: false,
    project: null,
    msg: null
  }

  // Dispach for exec actions
  const [state, dispatch] = useReducer(ProjectReducer, initState)

  // Functions for CRUD
  const showForm = () => {
    dispatch({
      type: FORM_PROJECT
    })
  }

  // Get Projects
  const getProjects = async () => {

    try {
      const answer = await clientAxios.get('/api/projects');

      dispatch({
        type: GET_PROJECTS,
        payload: answer.data.projects
      })

    } catch(error) {
      const alert = {
        msg: 'There are an error',
        cat: 'alerta-error'
      }

      dispatch({
        type: PROJECT_ERROR,
        payload: alert
      })
    }
  }

  // Add new project
  const addProject = async project => {

    try {
      const answer = await clientAxios.post('/api/projects', project);

      // Insert project in state
      dispatch({
        type: ADD_PROYECT,
        payload: answer.data
      })

    } catch(error) {
      const alert = {
        msg: 'There are an error',
        cat: 'alerta-error'
      }

      dispatch({
        type: PROJECT_ERROR,
        payload: alert
      })
    }
  }

  // Validate form and show errors
  const showError = () => {
    dispatch({
      type: VALIDATE_FORM,
    })
  }

  // Select project
  const currentProject = projectId => {
    dispatch({
      type: CURRENT_PROJECT,
      payload: projectId
    })
  }

  // Remove project
  const removeProject = async projectId => {

    try {
      await clientAxios.delete(`/api/projects/${projectId}`);
      dispatch({
        type: REMOVE_PROJECT,
        payload: projectId
      })

    } catch(error) {
      const alert = {
        msg: 'There are an error',
        cat: 'alerta-error'
      }

      dispatch({
        type: PROJECT_ERROR,
        payload: alert
      })
    }
  }

  return(
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        form: state.form,
        errorForm: state.errorForm,
        project: state.project,
        msg: state.msg,
        showForm,
        getProjects,
        addProject,
        showError,
        currentProject,
        removeProject
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  )
}

export default ProjectState;