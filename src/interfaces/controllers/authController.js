
class AuthController {
  constructor(authUseCase, authService) {
    this.authUseCase = authUseCase;
    this.authService = authService;
  }

  async requestToken(req, res) {
    try {
      const { operation } = req.body;
      if (!['register', 'login'].includes(operation)) {
        return res.status(200).send({ message: 'Operación no válida' ,status: false });
      }
      const token = this.authService.generateOneTimeToken(operation);
      res.status(200).send({ token:token,message:"token generado",status: true });
    } catch (error) {
     
      res.status(200).send({ message: 'Error al generar token', error: error.message ,status: false});
    }
  }

  async register(req, res) {
    try {
      const { email, password } = req.body;
      const token = req.headers['authorization']?.split(' ')[1];
      const decodedToken = this.authService.verifyToken(token);
      if (decodedToken.operation !== 'register') {
        throw new Error('Token no autorizado para esta operación');
      }

      await this.authUseCase.register(email, password);
      res.status(200).send({ message: 'Usuario registrado exitosamente' ,status: true });
    } catch (error) {
      if (error.code === 11000) {
       
        res.status(200).send({
          message: 'Este nombre de usuario ya está en uso. Por favor elige otro.',
          status: false
        });
      } else {
        res.status(200).json({
          message: error.errors, 
          status: false
        });
      }
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = req.headers['authorization']?.split(' ')[1];
      const decodedToken = this.authService.verifyToken(token);
      if (decodedToken.operation !== 'login') {
        throw new Error('Token no autorizado para esta operación');
      }

      const sessionToken = await this.authUseCase.login(email, password);
      res.status(200).send({message: 'Login exitoso', token: sessionToken ,status: true });
    } catch (error) {
      res.status(200).send({message: 'Login fallido', error: error.message , status: false });
    }
  }
}

module.exports = AuthController;
