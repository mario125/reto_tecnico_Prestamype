const express = require('express');
const CambioController = require('../controllers/cambioController');
const CambioRepository = require('../../domain/repositories/cambioRepository');
const AuthService = require('../../infrastructure/authService');
const {authenticateToken, validateUserToken } = require('../authMiddleware');

const router = express.Router();

const cambioRepository = new CambioRepository();
const authService = new AuthService();
const cambioController = new CambioController(cambioRepository, authService);

// Crear solicitud de cambio (compra o venta)
router.post('/cambio', validateUserToken, cambioController.crearCambio.bind(cambioController));

// Listar todas las solicitudes de cambio del usuario
router.get('/cambio', validateUserToken, cambioController.listarCambios.bind(cambioController));

// Eliminar una solicitud de cambio específica
router.delete('/cambio/:id', validateUserToken, cambioController.eliminarCambio.bind(cambioController));

module.exports = router;
