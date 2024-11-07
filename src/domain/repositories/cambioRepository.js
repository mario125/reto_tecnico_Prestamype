
const Cambio = require('../cambioModel');

class CambioRepository {
  async createCambio(cambioData) {
    const cambio = new Cambio(cambioData);
    return await cambio.save();
  }

  async getCambiosByUser(userId) {
    return await Cambio.find({ id_usuario: userId });
  }

  async deleteCambioById(id, userId) {
    return await Cambio.findOneAndDelete({ _id: id, id_usuario: userId });
  }
}

module.exports = CambioRepository;
