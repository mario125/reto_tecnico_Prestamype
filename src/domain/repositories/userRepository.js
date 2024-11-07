
const User = require('../userModel'); 

class UserRepository {
  async createUser(userData) {
    const user = new User(userData);
    return await user.save(); 
  }

  async findByemail(email) {
    return await User.findOne({ email }); 
  }
}

module.exports = UserRepository;
