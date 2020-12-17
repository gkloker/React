import {
  FORM_PROJECT,
  GET_PROJECTS,
  ADD_PROYECT,
  PROJECT_ERROR,
  VALIDATE_FORM,
  CURRENT_PROJECT,
  REMOVE_PROJECT
} from "../../types";
// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case FORM_PROJECT:
      return {
        ...state,
        form: true
      }
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload
      }
    case ADD_PROYECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
        form: false,
        errorForm: false
      }
    case VALIDATE_FORM:
      return {
        ...state,
        errorForm: true
      }
    case CURRENT_PROJECT:
      return {
        ...state,
        project: state.projects.filter(project => project._id === action.payload)
      }
    case REMOVE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(project => project._id !== action.payload),
        project: null
      }
    case PROJECT_ERROR:
      return {
        ...state,
        msg: action.payload
      }
    default:
      return state;
  }
}