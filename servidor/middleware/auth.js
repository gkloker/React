// Validate if is this project
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Read token from header
  const token = req.header('x-auth-token');

  // Review if there arent token
  if (!token) {
    return res.status(401).json({ msg: 'There aren´t token' });
  }

  // Validate token
  try {
    const encode = jwt.verify(token, process.env.SECRET);
    req.user = encode.user;
    next();

  } catch(error) {
    console.log(error);
    return res.status(401).json({ msg: 'Token don´t valid' });
  }
}