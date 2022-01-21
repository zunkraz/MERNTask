import React, {useContext, useState, useEffect} from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/task/taskContext';

const FormTask = () => {
    
    const projectsContext = useContext(projectContext);
    const {project} = projectsContext;
    
    const tasksContext = useContext(taskContext);
    const {addTask,errorTask,validateTask,getTasks,taskSelected,updateTask} = tasksContext;
    const [task,saveTask] = useState({
        name: '',
    });

    //Effect for detect if exist a task selected
    useEffect(() => {
        if(taskSelected !== null){
            saveTask(taskSelected)
        }else{
            saveTask({
                name: ''
            })
        }
    },[taskSelected])


    const {name} = task
    //if i haven a project
    if(!project){
        return null
    }
    const handleSubmit = e => {
        e.preventDefault();
        // validations
        if(name === ''){
            validateTask();
            return;
        }
        
        if(taskSelected === null){
            //add new Task
            task.project = project[0]._id
            addTask(task)
        }
        if(taskSelected !== null){
            updateTask(task)
        }
        getTasks(project[0]._id)
        //reset form
        saveTask({
            name: ''
        })
    }
    const handleChange = e => {
        
        saveTask({
            ...task,
            [e.target.name] : e.target.value
        })
    }
    return ( 
        <div className='formulario' onSubmit={handleSubmit}>
            <form>
                <div className='contenedor-input'>
                    <input type="text"
                    className='input-text'
                    placeholder='Task name...'
                    name='name'
                    value={name}
                    autoComplete='off'
                    onChange={handleChange}
                    />
                </div>

                <div className='contenedor-input'>
                    <input type="submit"
                    className='btn btn-primario btn-submit btn-block'
                    value={taskSelected ? 'Edit Task' : 'Add Task'} />
                </div>
            </form>
            {errorTask ? <p className='mensaje error'>The name is required</p> : null}
        </div>
     );
}
 
export default FormTask;