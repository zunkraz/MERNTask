import React, {useReducer} from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import { v4 as uuidv4 } from 'uuid';

import { 
    FORM_PROJECT,
     GET_PROJECTS,
     ADD_PROJECT,
     VALIDATE_FORM,
     CURRENT_PROJECT,
     DELETE_PROJECT,
     } from '../types';



const ProjectState = props => {

    const projects = [
        {id:1,name: 'tienda virtual'},
        {id:2, name: 'tienda fisica'},
        {id:3, name: 'tienda hibrida'},
        {id:4, name: 'tienda remota'},
    ]

    const initialState = {
        form: false,
        projects: [],
        project: null,
        formError: false,
    }

    //dispatch for execute the actions
    const [state,dispatch] = useReducer(projectReducer,initialState);

    //functions for the CRUD
    const showForm = () => {
        dispatch({
            type: FORM_PROJECT
        })
    };
    //Get projects
    const getProjects = () => {
        dispatch({
            type:GET_PROJECTS,
            payload:projects
        })
    }

    //Add Project
    const addProject = project => {
        project.id = uuidv4();
        dispatch({
            type:ADD_PROJECT,
            payload:project
        })
    }
    //Show error
    const showError = () => {
        dispatch({
            type:VALIDATE_FORM
        })
    }
    //Select current project
    const currentProject = projectId => {
        dispatch({
            type: CURRENT_PROJECT,
            payload: projectId
        })
    }
    //Delete a project
    const deleteProject = id => {
        dispatch({
            type: DELETE_PROJECT,
            payload: id
        })
    }
    return(
        <projectContext.Provider
            value={{
                 form: state.form,
                 projects: state.projects,
                 project: state.project,
                 formError:state.formError,
                 showForm,
                 getProjects,
                 addProject,
                 showError,
                 currentProject,
                 deleteProject,
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState;