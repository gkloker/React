// Routes to create users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const userController = require('../controllers/userController');

// Create user - api/users
router.post('/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Add a valid email').isEmail(),
    check('password', 'Password minimum 6 characters').isLength({ min: 6 })
  ],
  userController.createUser
);

module.exports = router;