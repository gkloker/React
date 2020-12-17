// Routes projects
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');
const projectController = require('../controllers/projectController');

// Create projects - api/project
router.post('/',
  auth,
  [
    check('name', 'Name is required').not().isEmpty()
  ],
  projectController.createProject
);

// Get all projects
router.get('/',
  auth,
  projectController.getProjects,
);

// Update project by id
router.put('/:id',
  auth,
  [
    check('name', 'Name is required').not().isEmpty()
  ],
  projectController.updateProject,
);

// Delete project
router.delete('/:id',
  auth,
  projectController.deleteProject,
);

module.exports = router;