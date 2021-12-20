import React, {useReducer} from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import { v4 as uuidv4 } from 'uuid';


import {
    TASKS_PROJECTS,
    ADD_TASK,
    VALIDATE_TASK,
    DELETE_TASK,
    STATUS_TASK,
    EDIT_TASK,
    UPDATE_TASK,
} from '../../types/index'

const TaskState = props => {
    const initialState = {
        tasks:[
            {name: 'Choose platform', state: true, projectId: 1 ,idTask:1},
            {name: 'Choose colors', state: false , projectId: 3 ,idTask:2},
            {name: 'Choose payments', state: false, projectId: 2 ,idTask:3},
            {name: 'Choose host', state: true, projectId: 1 ,idTask:4},
            {name: 'Choose platform', state: true, projectId: 1 ,idTask:5},
            {name: 'Choose colors', state: false , projectId: 4 ,idTask:6},
            {name: 'Choose payments', state: false, projectId: 2 ,idTask:7},
            {name: 'Choose payments', state: false, projectId: 2 ,idTask:8},
            {name: 'Choose host', state: true, projectId: 1 ,idTask:9},
            {name: 'Antonio', state: true, projectId: 1 ,idTask:10},
        ],
        projectTask: null,
        errorTask: false,
        taskSelected: null
    }

    //Create dispatch and state
    const [state,dispatch] = useReducer(TaskReducer, initialState)

    //functions
    //gettings tasks
    const getTasks = projectId => {
        dispatch({
            type:TASKS_PROJECTS,
            payload:projectId
        })
    }
    //Add Task
    const addTask = task => {
        task.idTask = uuidv4();
        dispatch({
            type: ADD_TASK,
            payload:task,
        })
    }
    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK,
        })
    }
    const deleteTask = idTask => {
        dispatch({
            type:DELETE_TASK,
            payload:idTask
        })
    }
    const stateTask = task => {
        dispatch({
            type:STATUS_TASK,
            payload:task
        })
    }
    const editTask = task => {
        dispatch({
            type:EDIT_TASK,
            payload:task
        })
    }
    const updateTask = task => {
        dispatch({
            type: UPDATE_TASK,
            payload: task
        })
    }
    return(
        <TaskContext.Provider
            value={{
                tasks:state.tasks,
                projectTask: state.projectTask,
                errorTask: state.errorTask,
                taskSelected: state.taskSelected,
                getTasks,
                addTask,
                validateTask,
                deleteTask,
                stateTask,
                editTask,
                updateTask,
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
};
export default TaskState;
