
const AuthService = require('../infrastructure/authService');
const authService = new AuthService();

// Middleware para validar tokens con un propósito específico, como 'register' o 'login'
function validateOperationToken(operation) {
  return (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(403).send({ error: 'Token no proporcionado' });
    }

    try {
      const decoded = authService.verifyToken(token);
      if (decoded.operation !== operation) {
        return res.status(403).send({ error: 'Token no autorizado para esta operación' });
      }
      next();
    } catch (error) {
      return res.status(401).send({ error: 'Token inválido o expirado' });
    }
  };
}

// Middleware para validar tokens de autenticación generales, usados en las rutas de cambio
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = authService.verifyToken(token);
    req.user = decoded;  
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

// Nuevo Middleware para validar tokens de usuario en rutas de cambio
function validateUserToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = authService.verifyToken(token);
    req.user = { id: decoded.userId, email: decoded.email }; 
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

module.exports = { validateOperationToken, authenticateToken, validateUserToken };
