import {
    TASKS_PROJECTS,
    ADD_TASK,
    VALIDATE_TASK,
    DELETE_TASK,
    STATUS_TASK,
    EDIT_TASK,
    UPDATE_TASK,

} from '../../types/index'

const stateTwo = (state,action) => {
    switch(action.type){
       case TASKS_PROJECTS:
           return {
               ...state,
               projectTask: state.tasks.filter(task => task.projectId === action.payload)
           }
        case ADD_TASK:
            return {
                ...state,
                tasks: [action.payload,...state.tasks],
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
                tasks:state.tasks.filter(task => task.idTask !== action.payload)
            }
        case UPDATE_TASK:
        case STATUS_TASK:
        
            return{
                ...state,
                tasks: state.tasks.map(task => task.idTask === action.payload.idTask ? action.payload:  task),
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