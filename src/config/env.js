
require('dotenv').config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION || '1h',
  shortTokenExpiration: process.env.SHORT_TOKEN_EXPIRATION || '5m',
  mongoUri: process.env.MONGO_URI,
  port: process.env.PORT || 3000,
};
