import React, {useReducer} from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import clientAxios from '../../config/axios';
import { 
    FORM_PROJECT,
     GET_PROJECTS,
     ADD_PROJECT,
     VALIDATE_FORM,
     CURRENT_PROJECT,
     DELETE_PROJECT,
     PROJECT_ERROR
     } from '../../types';



const ProjectState = props => {

    const initialState = {
        form: false,
        projects: [],
        project: null,
        formError: false,
        message: null
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
    const getProjects = async () => {
     try {
         const result = await clientAxios.get('/api/projects')
         dispatch({
            type:GET_PROJECTS,
            payload:result.data.projects  
        })
     } catch (error) {
         console.log(error)
     }
    }

    //Add Project
    const addProject = async project => {
        try {
            const result = await clientAxios.post('/api/projects',project);
            dispatch({
                type:ADD_PROJECT,
                payload:result.data
            })
        } catch (error) {
            console.log(error);
        }
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
    const deleteProject = async id => {
       try {    
           await clientAxios.delete(`/api/projects/${id}`);
           dispatch({
            type: DELETE_PROJECT,
            payload: id
        })
       } catch (error) {
           const alert = {
               msg:'Something went wrong!',
               category: 'alerta-error'
            }
           dispatch({
               type: PROJECT_ERROR,
               payload: alert
           })
       }
    }
    return(
        <projectContext.Provider
            value={{
                 form: state.form,
                 projects: state.projects,
                 project: state.project,
                 formError:state.formError,
                 message: state.message,
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