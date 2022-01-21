import React, {useState,useContext,useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext'
import AuthContext from '../../context/authentication/authContext'

const NewAccount = () => {
let navigate = useNavigate();
//extract values from alertContext
const alertContext = useContext(AlertContext);
const {alert, showAlert} = alertContext;

//extract values from authcontext
const authContext = useContext(AuthContext);
const {registerUser,authenticated,message} = authContext;

//si el usuario ya se autentico se registro o este duplicado

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
    name: '',
    password: '',
    passwordrepeat:'',
    email: ''
});

const {name,password,email,passwordrepeat} = user;

    const onChangeLogin = (e) => {
        saveUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //Validations
        if(name.trim() === '' ||
            email.trim() === '' ||
            password.trim() === '' ||
            passwordrepeat.trim() === ''){
                showAlert('All fields are required','alerta-error')
                return;
        }

        if(password.length <6){
            showAlert('password must be atleast 6 characters','alerta-error')
            return;
        }
        if(password !== passwordrepeat){
            showAlert('the passwords must be equeals','alerta-error')
            return;
        }
        //Actions

        registerUser({
            name,
            email,
            password
        })
    }
    return ( 
        <div className='form-usuario'>
            {alert ? (<div className={`alert ${alert.category}`}>{alert.msg}</div>) : null}
        <div className='contenedor-form sombra-dark'>
            <h1>Create Account</h1>

            <form 
                onSubmit={handleSubmit}
            >
            <div className='campo-form'>
                <label htmlFor="Username">Username</label>
                <input 
                type="text"
                placeholder='Username'
                autoComplete='off'
                name='name'
                value= {name}
                onChange={onChangeLogin}
                 />
            </div>
            <div className='campo-form'>
                <label htmlFor="email">Email</label>
                <input type="email" 
                name='email'
                autoComplete='off'
                value={email}
                placeholder='Email'
                onChange={onChangeLogin}
                />
            </div>
            <div className='campo-form'>
                <label htmlFor="password">Password</label>
                <input 
                type="password"
                placeholder='password'
                name='password'
                value= {password}
                onChange={onChangeLogin}
                 />
            </div>
            <div className='campo-form'> 
                <label htmlFor="repeatPassword">Repeat Password</label>
                <input 
                type="password"
                placeholder='Repeat Password'
                name='passwordrepeat'
                value= {passwordrepeat}
                onChange={onChangeLogin}
                 />
            </div>
            <div className='campo-form'>
                <input type="submit" value='Sing In' className='btn btn-primario btn-block'/>
            </div>
            
            </form>
            <Link to='/' className='enlace-cuenta'>Log in</Link>
        </div>
        </div>
     );
}
 
export default NewAccount;