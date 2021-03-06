import { 
    FORM_PROJECT,
     GET_PROJECTS,
     ADD_PROJECT,
     VALIDATE_FORM,
     CURRENT_PROJECT,
     DELETE_PROJECT,
     PROJECT_ERROR
     } from '../../types';

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
                project: state.projects.filter( project => project._id === actions.payload)
            }
        case DELETE_PROJECT:
            return{
                ...state,
                projects: state.projects.filter( project => project._id !== actions.payload),
                project: null
            }
        case PROJECT_ERROR:
            return {
                ...state,
                message: actions.payload
            }
        default:
            return state;
    }
}
export default state