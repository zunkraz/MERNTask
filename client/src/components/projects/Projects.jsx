import React from 'react';
import Bar from '../layout/Bar';
import Sidebar from '../layout/Sidebar';
import FormTask from '../task/FormTask'
import TaskList from '../task/TaskList'

const Projects = () => {
    return (  
        <div className='contenedor-app'>
            <Sidebar />
            <div className='seccion-principal'>
                <Bar />
                <main>
                    <FormTask / >    
                    <div className='contenedor-tareas'>
                        <TaskList />
                    </div>
                </main>
            </div>
        </div>
    );
}
 
export default Projects;