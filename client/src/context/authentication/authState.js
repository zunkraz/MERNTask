import React, {useReducer} from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import clientAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';
import {
    GET_USER,
    SUCCESS_REGISTER,
    ERROR_REGISTER,
    LOGIN_ERROR,
    CLOSE_SESSION,
    LOGIN_SUCCSESS
} from '../../types/index';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        message: null,
        loading: true
    }

    const [state,dispatch] = useReducer(AuthReducer,initialState);

    //functions
    // USER REGISTER
    const registerUser = async data => {
        try {
            const response = await clientAxios.post('/api/users', data);
            dispatch({
                type:SUCCESS_REGISTER,
                payload:response.data
            })
            //get user
            userAuthenticated();
        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category:'alerta-error'
            }
            dispatch({
                type: ERROR_REGISTER,
                payload: alert
            })
        }
    }
    //RETURN AUTHENTICATED USER
    const userAuthenticated = async () => {
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        try {
            const response = await clientAxios.get('/api/auth');
            dispatch({
                type: GET_USER,
                payload: response.data.user
            });

        } catch (error) {
            dispatch({
                type: LOGIN_ERROR
            })
        }
    };
//WHEN THE USER LOG IN
const logIn = async (data) => {
    try {
        const response = await clientAxios.post('/api/auth',data);
        dispatch({
            type:LOGIN_SUCCSESS,
            payload:response.data
        });
        //get user
        userAuthenticated();        
    } catch (error) {
        const alert = {
            msg: error.response.data.msg,
            category:'alerta-error'
        }
        dispatch({
            type:LOGIN_ERROR,
            payload:alert
        })
    }
}
const logOut = () => {
    dispatch({
        type:CLOSE_SESSION
    })
}
    return (
        <AuthContext.Provider
            value={{
                token:state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                loading: state.loading,
                registerUser,
                userAuthenticated,
                logIn,
                logOut
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthState;