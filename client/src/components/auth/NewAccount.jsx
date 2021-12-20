import React, {useState} from 'react';
import {Link} from 'react-router-dom';
const NewAccount = () => {
    
    //state for user
const [user,saveUser] = useState({
    username: '',
    password: '',
    passwordrepeat:'',
    email: ''
});

const {username,password,email,passwordrepeat} = user;

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
                name='username'
                value= {username}
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