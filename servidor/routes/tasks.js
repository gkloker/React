// Routes tasks
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');
const taskController = require('../controllers/taskController');

// Create task
// api/tasks
router.post('/',
  auth,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('project', 'Project is required').not().isEmpty()
  ],
  taskController.createTask
);

// Get tasks from project
router.get('/',
  auth,
  taskController.getTasks
);


// Update-edit task
router.put('/:id',
  auth,
  taskController.updateTask
);

// Delete task
router.delete('/:id',
  auth,
  taskController.deleteTask
);
module.exports = router;