const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  isError(req, res);

  const {
    email,
    password
  } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    // Create new user
    user = new User(req.body);

    // Hashear password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    // Save user
    await user.save();

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