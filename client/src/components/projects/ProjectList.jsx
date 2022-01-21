import React, { useContext, useEffect, useRef } from 'react';
import Project from './Project';
import projectContext from '../../context/projects/projectContext';
import {CSSTransition,TransitionGroup} from 'react-transition-group'
import AlertContext from '../../context/alerts/alertContext';
const ProjectList = () => {
const nodeRef = useRef(null);
//Extract projects from initial state
const projectsContext = useContext(projectContext)
const {projects,getProjects,message} = projectsContext;

const alertContext = useContext(AlertContext);
const {alert,showAlert} = alertContext;

useEffect(() => {
    if(message){
        showAlert(message.msg,message.category);
    }
    getProjects();
    //eslint-disable-next-line
},[message]);

//check if projects have content
if(projects.length === 0) return <p>No Projects yet, start making one.</p>;


return (  
    <ul className='listado-proyectos'>
        {alert ? (<div className={`alert ${alert.category}`} >{alert.msg}</div>) : null}
        
        <TransitionGroup>
        {projects.map(e => (
            <CSSTransition
            key={e._id}
            timeout={200}
            nodeRef={nodeRef}
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