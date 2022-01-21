const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

router.post('/',
    auth,
    [
       check('name', 'the name is required').not().isEmpty(),
       check('project', 'the project is required').not().isEmpty()
    ],
    taskController.newTask
)
// calling all tasks by project
router.get('/',
    auth,
    taskController.getTasks
);

//edit tasks
router.put('/:id', 
auth,
taskController.updateTask
);
//delete task
router.delete('/:id',
    auth,
    taskController.deleteTask
);

module.exports = router