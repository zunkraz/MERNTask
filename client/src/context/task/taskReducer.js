import {
    TASKS_PROJECTS,
    ADD_TASK,
    VALIDATE_TASK,
    DELETE_TASK,
    EDIT_TASK,
    UPDATE_TASK,

} from '../../types/index'

const stateTwo = (state,action) => {
    switch(action.type){
       case TASKS_PROJECTS:
           return {
               ...state,
               projectTask:action.payload
           }
        case ADD_TASK:
            return {
                ...state,
                projectTask: [action.payload,...state.projectTask],
                errorTask: false

            }
        case VALIDATE_TASK:
            return{
                ...state,
                errorTask: true

            }
        case DELETE_TASK:
            return{
                ...state,
                projectTask:state.projectTask.filter(task => task._id !== action.payload)
            }
        case UPDATE_TASK:  
            return{
                ...state,
                projectTask: state.projectTask.map(task => task._id === action.payload._id ? action.payload:  task),
                taskSelected:null
            }
        case EDIT_TASK:
            return{
                ...state,
                taskSelected: action.payload
            }
       
        default:
            return state;
    }
}
export default stateTwo;