const Project = require('../models/Project');
const {validationResult} = require('express-validator');

exports.createProject = async (req,res) => {

    //check if exists errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        //Create a new project
        const project = new Project(req.body);

        //save the project using JWT
        project.owner = req.user.id

        //save the project
        project.save();
        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(500).send('something went wrong')
    }
}

//get all projects for current user

exports.getProjects = async (req,res) => {  
    try{
        const projects = await Project.find({owner: req.user.id})
        res.json({projects});
    }catch(error){
        console.log(error);
        res.status(500).send('something went wrong in getProjects')
    }
}
// update a project
exports.updateProject = async (req,res) => {

    //check if exists errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    //extrac info from project
    const {name} = req.body;
    const newProject = {};
    if(name){
        newProject.name = name;
    }
    try {
        //check id
        let project = await Project.findById(req.params.id);
        //exists the project? 
        if(!project){
            return res.status(404).json({msg: 'Project not found'});
        }
        // check owner project
        if(project.owner.toString() !== req.user.id){
            return res.status(401).json({msg: 'permission denied'});
        }
        //update
        project = await Project.findByIdAndUpdate({_id: req.params.id},{$set : newProject}, {new: true});
        res.json({project});
    } catch (error) {
        console.log(error);
        res.status(500).send('Server not Work in updateProject')   
    }    
}
//delete project
exports.deleteProject = async (req,res) => {
    //check if exists errors
    const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
    try {
        //check id
        let project = await Project.findById(req.params.id);
        //exists the project? 
        if(!project){
            return res.status(404).json({msg: 'Project not found'});
        }
        // check owner project
        if(project.owner.toString() !== req.user.id){
            return res.status(401).json({msg: 'permission denied'});
        }
        //delete
        project = await Project.findOneAndRemove({_id: req.params.id});
             res.json({msg: 'Project deleted'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}