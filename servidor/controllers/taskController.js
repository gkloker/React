const { validationResult } = require('express-validator');
const Task = require('../models/Task');
const Project = require('../models/Project');
const { restart } = require('nodemon');

// Create new task
exports.createTask = async (req, res) => {
  isError(req, res);

  try {
    // Creck project
    const { project } = req.body;
    const existProject =  await Project.findById(project);

    // Exist project?
    if (!existProject) {
      return res.status(404).json({ msg: 'Project doesn´t founded' });
    }

    // Review owner project
    if (existProject.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Create task
    const task = new Task(req.body);
    await task.save();
    res.json({ task }); // Print task added

  } catch(error) {
    console.log(error);
    res.status(500).send('There are an error');
  }
}

// Get tasks
exports.getTasks = async (req, res) => {
  try {
    // Creck project
    const { project } = req.query;
    const existProject =  await Project.findById(project);

    // Exist project?
    if (!existProject) {
      return res.status(404).json({ msg: 'Project doesn´t founded' });
    }

    // Review owner project
    if (existProject.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Get task from project
    const tasks = await Task.find({ project }).sort({ created: -1 });
    res.json({ tasks });

  } catch(error) {
    console.log(error);
    res.status(500).send('There are an error');
  }
}

// Update-edit task
exports.updateTask = async (req, res) => {
  try {
    // Creck project
    const { 
      project,
      name,
      state
    } = req.body;
    let task = await Task.findById(req.params.id);
    const existProject = await Project.findById(project);

    if (!task) {
      return res.status(404).json({ msg: 'Task doesn´t exist' });
    }

    if (existProject.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Create objet with the new information
    const newTask = {};
    newTask.name = name;
    newTask.state = state;

    // Save task
    task = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, { new: true });
    res.json({ task });

  } catch(error) {
    console.log(error);
    res.status(500).send('There are an error');
  }
}

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    // Creck project
    const { project } = req.query;
    let task = await Task.findById(req.params.id);
    const existProject = await Project.findById(project);

    if (!task) {
      return res.status(404).json({ msg: 'Task doesn´t exist' });
    }

    if (existProject.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Delete task
    await Task.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Task deleted" });

  } catch(error) {
    console.log(error);
    res.status(500).send('There are an error');
  }
}

// Check errors
function isError (req, res) {
  const errors = validationResult(req);
  if ( !errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
}