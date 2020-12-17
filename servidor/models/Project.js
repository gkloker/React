const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
  name:{
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'  // User model name
  },
  created: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Project', ProjectSchema);