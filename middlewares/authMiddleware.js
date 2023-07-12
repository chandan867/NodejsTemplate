const jwt = require('jsonwebtoken');
const config = require('../config/auth');
const logger = require('../config/logger');

exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, config.secretKey, (error, decoded) => {
      if (error) {
        logger.error(`Token verification error: ${error}`);
        console.error('Token verification error:', error);
        return res.status(401).json({ message: 'Failed to authenticate token' });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    logger.error(`Token verification error: ${error}`);
    console.error('Token verification error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
