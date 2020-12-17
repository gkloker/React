// Routes to login users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Authenticate user - api/auth
router.post('/',
  authController.allowUser
);

// Get user authenticated
router.get('/',
  auth,
  authController.userLogin
);

module.exports = router;