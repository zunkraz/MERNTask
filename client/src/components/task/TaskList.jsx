import React,{Fragment} from 'react';
import { useContext } from 'react';
import projectContext from '../../context/projectContext';
import taskContext from '../../context/task/taskContext';
import Task from './Task';
import {CSSTransition,TransitionGroup} from 'react-transition-group';


const TaskList = () => {
    //extract tasks from initial state two
    const tasksContext = useContext(taskContext);
    const {projectTask} = tasksContext;

    //extract projects from initial state
    const projectsContext = useContext(projectContext);
    const {project,deleteProject} = projectsContext
    //if i haven a project
    if(!project){
        return <h2>Select a project</h2>
    }
    
 
    return ( 
        <Fragment>
            <h2>Project: {project[0].name}</h2>
            <ul className='listado-tareas'>
                {projectTask.length === 0 
                    ? <li className='tareas'><p>No tasks yet</p></li>
                    : <TransitionGroup>
                       {projectTask.map(task => 
                        <CSSTransition
                        key={task.idTask}
                        timeout={200}
                        classNames='tarea'
                        >
                            <Task 
                            task={task}
                        />
                        </CSSTransition>
                        )}
                    </TransitionGroup>
                }
            </ul>
            <button type='button' className='btn btn-eliminar' onClick={() => deleteProject(project[0].id)}>Delete Project &times;</button>
        </Fragment>
     );
}
 
export default TaskList;