import React, {useState} from 'react';
import { Link } from 'react-router-dom';



const Login = () => {

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

        //Actions
    }
    return ( 
        <div className='form-usuario'>
            <div className='contenedor-form sombra-dark'>
                <h1>Iniciar Sesión</h1>
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