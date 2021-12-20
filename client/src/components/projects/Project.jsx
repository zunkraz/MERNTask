import React, {useContext} from 'react';

import projectContext from '../../context/projectContext';
import taskContext from '../../context/task/taskContext';

const Project = ({project}) => {

    const projectsContext = useContext(projectContext);
    const {currentProject} = projectsContext;
   
    const tasksContext = useContext(taskContext);
    const {getTasks} = tasksContext;
    
    //functions for add the current project
    const selectProject = id => {
        currentProject(id);
        getTasks(id);

    }


    return ( 
        <li>
            <button type="button" className='btn btn-blank' onClick={() => selectProject(project.id)}>
                {project.name}
            </button>
               
        </li>
     );
}
 
export default Project;