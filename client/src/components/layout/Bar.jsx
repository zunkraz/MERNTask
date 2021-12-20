import React from 'react';

const Bar = () => {
    return ( 
        <header className='app-header'>
            <p className='nombre-usuario'>Hello <span>Antonio</span>!</p>
        
            <nav className='nav-principal'>
                <a href="#fj">Log out</a>
            </nav>
        </header>
     );
}
 
export default Bar;