const Task = require('../models/Task');
const Project = require('../models/Project');
const {validationResult} = require('express-validator');
//Create a new task

exports.newTask = async (req,res) => {
    //check if exists errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        //extract the project
        const {project} = req.body;
        const projectExist = await Project.findById(project)
        if(!project){
            return res.status(404).json({msg: 'Project not found'})
        }
        //check if current project belongs to authenticated user
        if(projectExist.owner.toString() !== req.user.id){
            return res.status(401).json({msg: 'No permissions'})
        }
        //creating task
        const task = new Task(req.body);
        await task.save();
        res.json({task});
    } catch (error) {
       console.log(error);
       res.status(500).send('Something went wrong in task controller') 
    }
}
//get tasks by project
exports.getTasks = async (req,res) => {
    try {
        const  {project} = req.query;
        if(!project){
            return res.status(404).json({msg: 'Project not found'})
        };
        const projectExist = await Project.findById(project);
    //check if current project belongs to authenticated user
        if(projectExist.owner.toString() !== req.user.id){
            return res.status(401).json({msg: 'No permissions'})
        };
    //get tasks by project
    const tasks = await Task.find({project});
    res.json({tasks})
    } catch (error) {
       console.log(error);
       res.status(500).send('Something went wrong in task Controller') 
    }
}
exports.updateTask = async (req,res) => {
    try {
        const  {project,name,status} = req.body;
        const projectExist = await Project.findById(project)
    
    //exists task?
    let task = await Task.findById(req.params.id)
        
    if(!task){
        return res.status(404).json({msg:'Task not found'})
    }

    //check if current project belongs to authenticated user
        if(projectExist.owner.toString() !== req.user.id){
            return res.status(401).json({msg: 'No permissions'})
        }
    //new info for task
    const newTask = {};
    newTask.name= name;
    newTask.status = status;
    

    //save task
    task = await Task.findOneAndUpdate({_id: req.params.id}, newTask, {new:true})
    res.json({task})
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong in task Controller')
    }
}
//Delete task
exports.deleteTask = async (req,res) =>{
    try {
    const  {project} = req.query;
    const projectExist = await Project.findById(project)
    
    //exists task?
    let task = await Task.findById(req.params.id)
   
    if(!task){
        return res.status(404).json({msg:'Task not found'})
    }
      //check if current project belongs to authenticated user
      if(projectExist.owner.toString() !== req.user.id){
        return res.status(401).json({msg: 'No permissions'})
    }
    //delete Task
    await Task.findOneAndRemove({_id: req.params.id})
    res.json({msg: 'Task deleted'})
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong in task Controller')
    }
}