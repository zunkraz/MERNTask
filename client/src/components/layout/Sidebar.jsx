import React from 'react';
import NewProject from '../projects/NewProject';
import ProjectList from '../projects/ProjectList';
import styled from '@emotion/styled';

const Aside = styled.aside`
    background:;
`
const Sidebar = () => {

    return ( 
        <Aside>
            <h1>MERN<span>TASK</span></h1>
            <NewProject />
            <div className='proyectos'>
                <h2>Your Projects</h2>
                <ProjectList />
            </div>
        </Aside>
    
     );
}
 
export default Sidebar;