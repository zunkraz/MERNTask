import { 
    FORM_PROJECT,
     GET_PROJECTS,
     ADD_PROJECT,
     VALIDATE_FORM,
     CURRENT_PROJECT,
     DELETE_PROJECT,
     } from '../types';

const state  = (state, actions) => {
    switch(actions.type){
        case FORM_PROJECT:
            return {
                ...state,
                form:true
            }
        case GET_PROJECTS:
            return {
                ...state,
                projects: actions.payload
            }
        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects,actions.payload],
                form: false,
                formError:false

            }
        case VALIDATE_FORM:
            return{
                ...state,
                formError:true
            }
        case CURRENT_PROJECT:
            return {
                ...state,
                project: state.projects.filter( project => project.id === actions.payload)
            }
        case DELETE_PROJECT:
            return{
                ...state,
                projects: state.projects.filter( project => project.id !== actions.payload),
                project: null
            }
        default:
            return state;
    }
}
export default state