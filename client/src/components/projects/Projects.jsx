import React, {useContext, useEffect}  from 'react';
import Bar from '../layout/Bar';
import Sidebar from '../layout/Sidebar';
import FormTask from '../task/FormTask'
import TaskList from '../task/TaskList'
import AuthContext from '../../context/authentication/authContext';

const Projects = () => {

    //extract info about authentication
    const authcontext = useContext(AuthContext)
    const {userAuthenticated} = authcontext;
    
    useEffect(() => {
        userAuthenticated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
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