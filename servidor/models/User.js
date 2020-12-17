const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true  // Take out spaces
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  reg: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Users', usersSchema);