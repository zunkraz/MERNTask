import {
    GET_USER,
    CLOSE_SESSION,
    SUCCESS_REGISTER,
    ERROR_REGISTER,
    LOGIN_ERROR,
    LOGIN_SUCCSESS
} from '../../types/index';

const authReducerFunc = (state, action) => {
    switch(action.type){
       case LOGIN_SUCCSESS:
       case SUCCESS_REGISTER:
           localStorage.setItem('token',action.payload.token);
           return{
               ...state,
               authenticated: true,
               message: null,
               loading:false,
           } 
        case LOGIN_ERROR: 
        case CLOSE_SESSION:
        case ERROR_REGISTER:
            localStorage.removeItem('token')
           return{
               ...state,
               token:null,
               user:null,
               authenticated: null,
               message:action.payload,
               loading:false
           }
        case GET_USER:
            return{
                ...state,
               authenticated: true,
                user: action.payload,
                loading:false,
            }
        default:
            return state;
    }
}
export default authReducerFunc;