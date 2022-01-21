import React, {Fragment, useContext, useState} from 'react';
import projectContext from '../../context/projects/projectContext';

const NewProject = () => {
    //get form state

    const projectsContext = useContext(projectContext);
    const {form,formError,showForm,addProject,showError} = projectsContext;
   
    //state
   const [project, saveProject] = useState({
    name: ''
   });
   const {name} = project;

   //functions
   const onChangeProject = e => {
       saveProject({
           ...project,
           [e.target.name] : e.target.value
       })
   }
   const handleSubmit = e => {
       e.preventDefault();

       //validations
        if(name === ''){
            showError();
            return;
        }
       //add to state
        addProject(project);
       //reset form
       saveProject({
           name: ''
       })
   }
    return ( 
        <Fragment>
            <button
            className='btn btn-block btn-primario'
            type='button'
            onClick={() => showForm()}
            >
                New Project
            </button>

           {
             form ?
             <form
             className='formulario-nuevo-proyecto'
             onSubmit={handleSubmit}
             >
                 <input 
                 type="text"
                 placeholder='Project Name'
                 name= 'name'
                 value={name}
                 autoComplete='off'
                 className='input-text'
                 onChange={onChangeProject}
                  />
 
                 <input 
                 className='btn btn-block btn-primario'
                 type="submit"
                 value='Add Project'
                  />
             </form>
             : null
           }
           {
               formError ? <p className='mensaje error'>The project name is required</p> 
               : null
           }
        </Fragment>
     );
}
 
export default NewProject;