const mongoose = require('mongoose');
const logger = require('./logger');
require('dotenv').config();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    logger.info('Connected to database');
    console.log('Connected to database');
  })
  .catch((error) => {
    logger.error(`Database connection error: ${error}`);
    console.error('Database connection error:', error);
  });
