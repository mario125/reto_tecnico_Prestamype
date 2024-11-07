
const { registerSchema, loginSchema } = require('./authValidation');

class AuthUseCase {
  constructor(userRepository, authService) {
    this.userRepository = userRepository;
    this.authService = authService;
  }

  async register(email, password) {
    registerSchema.parse({ email, password });
    const hashedPassword = await this.authService.hashPassword(password);
    return this.userRepository.createUser({ email, password: hashedPassword });
  }

  async login(email, password) {
    loginSchema.parse({ email, password });
    const user = await this.userRepository.findByemail(email);
    if (!user || !(await this.authService.comparePasswords(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    return this.authService.generateToken(user);
  }
}

module.exports = AuthUseCase;
