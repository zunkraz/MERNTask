const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//create projects
router.post('/',
auth,
[
    check('name', 'The name for your projects is required').not().isEmpty()
],
projectController.createProject
);
 
//get all projects
router.get('/',
    auth,
    projectController.getProjects
);

//update project
router.put('/:id',
    auth,
    [
        check('name','the name is required').not().isEmpty()
    ],
    projectController.updateProject
);

//delete a project
router.delete('/:id',
    auth,
    projectController.deleteProject
);
module.exports = router;