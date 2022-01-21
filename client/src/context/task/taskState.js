import React, {useReducer} from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import clientAxios from '../../config/axios';
import {
    TASKS_PROJECTS,
    ADD_TASK,
    VALIDATE_TASK,
    DELETE_TASK,
    EDIT_TASK,
    UPDATE_TASK,
} from '../../types/index'

const TaskState = props => {
    const initialState = {
        projectTask: [],
        errorTask: false,
        taskSelected: null
    }

    //Create dispatch and state
    const [state,dispatch] = useReducer(TaskReducer, initialState)

    //functions
    //gettings tasks
    const getTasks = async project => {
        try {
        const result = await clientAxios.get(`/api/tasks`,{params:{project}})
        dispatch({
            type:TASKS_PROJECTS,
            payload: result.data.tasks
        })
       } catch (error) {
           console.log(error)
       }
    }
    //Add Task
    const addTask = async task => {
        try {
        const result = await clientAxios.post('/api/tasks',task)
        dispatch({
            type: ADD_TASK,
            payload:result.data.task,
        }) 
     } catch (error) {
         console.log(error)
     }
    }
    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK,
        })
    }
    const deleteTask = async (id,project) => {
       try {
         await clientAxios.delete(`/api/tasks/${id}`, {params: {project}})
         dispatch({
            type:DELETE_TASK,
            payload:id
        })
       } catch (error) {
           console.log(error)
       }
    }
    const updateTask = async task => {
        try {
            const result = await clientAxios.put(`/api/tasks/${task._id}`,task)
            dispatch({
                type: UPDATE_TASK,
                payload: result.data.task
            }) 
        } catch (error) {
            console.log(error)
        }
    }
 
    const editTask = task => {
        dispatch({
            type:EDIT_TASK,
            payload:task
        })
    }
  
    return(
        <TaskContext.Provider
            value={{
                projectTask: state.projectTask,
                errorTask: state.errorTask,
                taskSelected: state.taskSelected,
                getTasks,
                addTask,
                validateTask,
                deleteTask,
                editTask,
                updateTask,
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
};
export default TaskState;
