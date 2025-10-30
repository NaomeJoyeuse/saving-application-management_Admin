const jwt = require('jsonwebtoken');
const { AppError } = require('./errorhandling');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AppError(401, 'No token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(new AppError(401, 'Invalid or expired token'));
  }
};

module.exports = { authMiddleware };