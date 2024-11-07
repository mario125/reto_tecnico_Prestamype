
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtSecret, jwtExpiration, shortTokenExpiration } = require('../config/env');

class AuthService {
  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  // Genera un token de larga duración para login y sesiones
  generateSessionToken(user) {
    return jwt.sign(
      { id: user._id, email: user.email },
      jwtSecret,
      { expiresIn: jwtExpiration }
    );
  }

  // Genera un token de un solo uso, con una expiración corta
  generateOneTimeToken(operation) {
    return jwt.sign(
      { operation },
      jwtSecret,
      { expiresIn: shortTokenExpiration } 
    );
  }

  // Método para generar un token JWT
  generateToken(user) {   
    const payload = { userId: user._id, email: user.email };
    return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });
  }

  // Verifica cualquier tipo de token (ya sea de sesión o de un solo uso)
  verifyToken(token) {
    return jwt.verify(token, jwtSecret);
  }
}

module.exports = AuthService;
