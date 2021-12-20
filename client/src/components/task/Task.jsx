import React, {useContext} from 'react';
import taskContext from '../../context/task/taskContext';
import projectContext from '../../context/projectContext';


const Task = ({task}) => {

    const tasksContext = useContext(taskContext);
    const {deleteTask,getTasks,stateTask,editTask} = tasksContext;
    const projectsContext = useContext(projectContext);
    const {project} = projectsContext;

    const handleDelete = id => {
        deleteTask(id);
        getTasks(project[0].id);
    }
    const alterTask = task => {
        if(task.state){
            task.state = false
        }else{
            task.state = true
        }
        stateTask(task)
    }
    //modify a task
    const selectTask = task => {
        editTask(task);
    }
    return ( 
   <li className='tarea sombra'>
       <p>{task.name}</p>
       <div className='estado'>
            {task.state 
            ? 
                <button 
                    type='button'
                    className='completo'
                    onClick={() => alterTask(task)}
                > Complete 
                </button>
            :
            <button 
                    type='button'
                    className='incompleto'
                    onClick={() => alterTask(task)}
                > Incomplete 
                </button>
        }
       </div>
       <div className='acciones'>
           <button type='button' className='btn btn-primario' onClick={() => selectTask(task)}>Edit</button>
           <button type='button' className='btn btn-secundario'
           onClick={() => handleDelete(task.idTask)}>Detele</button>

       </div>
   </li>
    );
}
 
export default Task;