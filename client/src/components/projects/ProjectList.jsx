import React, { useContext, useEffect } from 'react';
import Project from './Project';
import projectContext from '../../context/projectContext';
import {CSSTransition,TransitionGroup} from 'react-transition-group'

const ProjectList = () => {
 
//Extract projects from initial state
const projectsContext = useContext(projectContext)
const {projects,getProjects} = projectsContext;

useEffect(() => {
    getProjects();
    //eslint-disable-next-line
},[]);

//check if projects have content
if(projects.length === 0) return <p>No Projects yet, start making one.</p>;


return (  
    <ul className='listado-proyectos'>
        <TransitionGroup>
        {projects.map(e => (
            <CSSTransition
            key={e.id}
            timeout={200}
            classNames='proyecto'
            >
                <Project project={e}/>
            </CSSTransition>
         ))}
        </TransitionGroup>
    </ul>
    );
}
 
export default ProjectList;