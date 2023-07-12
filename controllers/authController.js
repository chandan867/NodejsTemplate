const authService = require('../services/authService');
const logger = require('../config/logger');

exports.signup = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    await authService.signup(phoneNumber, password);
    res.status(200).json({ message: 'Signup successful' });
  } catch (error) {
    logger.error(`Signup error: ${error}`);
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Signup failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const token = await authService.login(phoneNumber, password);
    res.status(200).json({ token });
  } catch (error) {
    logger.error(`Login error: ${error}`);
    console.error('Login error:', error);
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
