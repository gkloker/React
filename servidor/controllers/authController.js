const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.allowUser = async (req, res) => {
  isError(req, res);

  const {
    email,
    password
  } = req.body;

  try {
    // Is register user
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'User doesn´t exist' });
    }

    // Review password
    const isPasswordUser = await bcryptjs.compare(password, user.password);
    if (!isPasswordUser) {
      return res.status(400).json({ msg: 'Password Incorrect' });
    }

    // Create json web token
    const payload = {
      user: {
        id: user.id
      }
    };
    jwt.sign(payload, process.env.SECRET, {
      expiresIn: 3600  // It will expire in an hour
    }, (error, token) => {
      if (error) throw error;

      res.json({ token });
    });

  } catch(error) {
    console.log(error);
  }
}

// Get user authenticated
exports.userLogin = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'There are an error' });
  }
}

// Check errors
function isError (req, res) {
  const errors = validationResult(req);
  if ( !errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
}