const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const AuthUseCase = require('../../application/authUseCase');
const UserRepository = require('../../domain/repositories/userRepository');
const AuthService = require('../../infrastructure/authService');
const { validateOperationToken } = require('../authMiddleware');


const authService = new AuthService();
const authUseCase = new AuthUseCase(new UserRepository(), authService);
const authController = new AuthController(authUseCase, authService);

router.post('/token', authController.requestToken.bind(authController));
router.post('/register', validateOperationToken('register'), authController.register.bind(authController));
router.post('/login', validateOperationToken('login'), authController.login.bind(authController));

module.exports = router;
