import React, { useReducer } from "react";
import TaskContext from "./taskContext";
import TaskReducer from "./taskReducer";
import clientAxios from "../../config/axios";
import {
  TASKS_PROJECTS,
  ADD_TASK,
  VALIDATE_TASK,
  REMOVE_TASK,
  CURRENT_TASK,
  EDIT_TASK,
  CLEAN_TASK
} from "../../types";

const TaskState = props => {
  const initState = {
    tasksProject: [],
    taskError: false,
    taskSelected: null
  }

  // Create dispatch and state
  const [ state, dispatch ] = useReducer(TaskReducer, initState);

  // Get tasks project
  const getTasks = async project => {

    try {
      const answer = await clientAxios.get('/api/tasks', { params: { project } });

      dispatch({
        type: TASKS_PROJECTS,
        payload: answer.data.tasks
      })
    } catch(error) {
      console.log(error);
    }
  }

  // Add task to project
  const addTask = async task => {

    try {
      // eslint-disable-next-line
      const answer = await clientAxios.post('/api/tasks', task);

      dispatch({
        type: ADD_TASK,
        payload: task
      })
    } catch(error) {
      console.log(error);
    }
  }

  // Validation and show error
  const validateTask = () => {
    dispatch({
      type: VALIDATE_TASK,
    })
  }

  // Remove task
  const removeTask = async ( id, project ) => {
    try {
      await clientAxios.delete(`/api/tasks/${id}`, { params: { project } });

      dispatch({
        type: REMOVE_TASK,
        payload: id
      })
    } catch(error) {
      console.log(error);
    }
  }

  // Update task
  const updateTask = async task => {

    try {
      const answer = await clientAxios.put(`/api/tasks/${task._id}`, task);

      dispatch({
        type: EDIT_TASK,
        payload: answer.data.task
      })
    } catch(error) {
      console.log(error);
    }
  }

  // Edit task
  const setCurrentTask = task => {
    dispatch({
      type: CURRENT_TASK,
      payload: task,
    })
  }

  // Clean task
  const cleanTask = () => {
    dispatch({
      type: CLEAN_TASK,
    })
  }

  return (
    <TaskContext.Provider
      value={{
        tasksProject: state.tasksProject,
        taskError: state.taskError,
        taskSelected: state.taskSelected,
        getTasks,
        addTask,
        validateTask,
        removeTask,
        setCurrentTask,
        updateTask,
        cleanTask
      }}
    >
      {props.children}
    </TaskContext.Provider>
  )
}

export default TaskState;