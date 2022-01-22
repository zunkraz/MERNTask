import React, {useContext, useEffect}  from 'react';
import AuthContext from '../../context/authentication/authContext';

const Bar = () => {

    //extract info about authentication
    const authcontext = useContext(AuthContext)
    const {user,logOut} = authcontext;
    
    useEffect(() =>{
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return ( 
        <header className='app-header'>
            {user ? <p className='nombre-usuario'>Hello <span>{user.name}</span>!</p> : null}
            
        
            <nav className='nav-principal'>
                <button 
                    className='btn btn-blank btn-close'
                    onClick={() => logOut()}   
                >Log out</button>
            </nav>
        </header>
     );
}
 
export default Bar;