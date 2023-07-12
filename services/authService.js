const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/auth');
const User = require('../models/User');
const logger = require('../config/logger');

exports.signup = async (phoneNumber, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      phoneNumber,
      password: hashedPassword,
    });
    await user.save();
  } catch (error) {
    logger.error(`Signup service error: ${error}`);
    console.error('Signup service error:', error);
    throw new Error('Signup failed');
  }
};

exports.login = async (phoneNumber, password) => {
  try {
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, config.secretKey, { expiresIn: '1h' });
    return token;
  } catch (error) {
    logger.error(`Login service error: ${error}`);
    console.error('Login service error:', error);
    throw new Error('Login failed');
  }
};
