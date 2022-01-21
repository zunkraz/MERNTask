import React, {useState, useContext, useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import AuthContext from '../../context/authentication/authContext'
import AlertContext from '../../context/alerts/alertContext';

const Login = () => {

let navigate = useNavigate();

const alertContext = useContext(AlertContext);
const {alert,showAlert} = alertContext;

//extract values from authcontext
const authContext = useContext(AuthContext);
const {authenticated,message,logIn} = authContext;

// en caso de que el password o el usuario no exista
useEffect(() => {
    if(authenticated){
        navigate('/projects')
    }
    if(message){
        showAlert(message.msg,message.category)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[message,authenticated,navigate]);

    //state for user
const [user,saveUser] = useState({
    email: '',
    password: ''
});

const {email,password} = user;

    const onChangeLogin = (e) => {
        saveUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //Validations
        if(email.trim() === '' || password.trim() === ''){
            return showAlert('All fields are required', 'alerta-error')
        }
        //Actions
        logIn({email,password});
    }
    return ( 
        <div className='form-usuario'>
            {alert ? (<div className={`alert ${alert.category}`}>{alert.msg}</div>) : null}
            
            <div className='contenedor-form sombra-dark'>
                <h1>Log In</h1>
            <form 
                onSubmit={handleSubmit}>
                <div className='campo-form'>
                    <label htmlFor="email">Email</label>  
                    <input 
                    type="email"
                    placeholder='Email'
                    name='email'
                    value= {email}
                    autoComplete='off'
                    onChange={onChangeLogin}
                    />
                </div>
                <div className='campo-form'>
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password"
                    placeholder='Password'
                    name='password'
                    value= {password}
                    onChange={onChangeLogin}
                    />
                </div>
                <div className='campo-form'>
                    <input type="submit" className='btn btn-primario btn-block' value='Log in'/>
                </div>
            </form>
            <Link to={'/new-account'} className='enlace-cuenta'> Sing up</Link>
            </div>
        </div>
     );
}
 
export default Login;