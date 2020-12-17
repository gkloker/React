const { validationResult } = require('express-validator');
const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  isError(req, res);

  try {
    // Create project
    const project = new Project(req.body);

    // Save owner by jwt
    project.owner = req.user.id;

    // Save project
    project.save();
    res.json(project);

  } catch(error) {
    console.log(error);
    res.status(400).send('There are an error');
  }
}

// Get all projects from current user
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id }).sort({ created: -1 });
    res.json({ projects });
  } catch(error) {
    console.log(error);
    res.status(400).send('There are an error');
  }
}

// Update project
exports.updateProject = async (req, res) => {
  isError(req, res);

  const { name } = req.body;
  const newProject = {};

  if (name) {
    newProject.name = name;
  }

  try {
    // Review id
    let project = await Project.findById(req.params.id);

    // Exist project?
    if (!project) {
      return res.status(404).json({ msg: 'Project doesn´t founded' });
    }

    // Review owner project
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Update
    project = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set: newProject }, { new: true });
    res.json({project});

  } catch(error) {
    console.log(error);
    res.status(500).send('Error in server');
  }
}

// delete project
exports.deleteProject = async (req, res) => {
  try {
    // Review id
    let project = await Project.findById(req.params.id);

    // Exist project?
    if (!project) {
      return res.status(404).json({ msg: 'Project doesn´t founded' });
    }

    // Review owner project
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Delete project
    await Project.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Project deleted' });

  } catch(error) {
    console.log(error);
    res.status(500).send('Error in server');
  }
}

// Check errors
function isError (req, res) {
  const errors = validationResult(req);
  if ( !errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
}