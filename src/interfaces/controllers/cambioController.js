
const axios = require('axios');
const CambioRepository = require('../../domain/repositories/cambioRepository');
const { jwtSecret } = require('../../config/env');

class CambioController {
  constructor(cambioRepository, authService) {
    this.cambioRepository = cambioRepository;
    this.authService = authService;
  }

  async crearCambio(req, res) {
    const { tipo_de_cambio, monto_enviar } = req.body;
    const id_usuario = req.user.id;  
  
    try {
      // Obtener la tasa de cambio desde la API externa
      const response = await axios.get(process.env.CAMBIO_API_URL);
      const { purchase_price, sale_price, _id } = response.data.data;
      const tasa = tipo_de_cambio === 'compra' ? purchase_price : sale_price;
      const monto_recibir = tipo_de_cambio === 'compra' ? monto_enviar * tasa : monto_enviar / tasa;
  
      // Crear la solicitud de cambio
      const nuevaSolicitud = await this.cambioRepository.createCambio({
        tipo_de_cambio,
        tasa_de_cambio: { _id, purchase_price, sale_price },
        monto_enviar,
        monto_recibir,
        id_usuario, 
      });
  
      res.status(200).json({ message: 'Solicitud de cambio creada', data: nuevaSolicitud, status: true });
    } catch (error) {
      res.status(200).json({ message: 'Error al crear solicitud de cambio', status: false, error: error.message });
    }
  }
  

  async listarCambios(req, res) {
    try {
      
      const cambios = await this.cambioRepository.getCambiosByUser(req.user.id);
      res.json({ message: 'Lista de solicitudes de cambio', data: cambios , status: true});
    } catch (error) {
      res.status(200).json({ message: 'Error al listar solicitudes de cambio', error: error.message ,status: false });
    }
  }

  async eliminarCambio(req, res) {
    try {
      const { id } = req.params;
      const cambio = await this.cambioRepository.deleteCambioById(id, req.user.id);
      if (!cambio) return res.status(200).json({ message: 'Solicitud de cambio no encontrada o no autorizada',status: false });

      res.json({ message: 'Solicitud de cambio eliminada', data: cambio ,status: true });
    } catch (error) {
      res.status(200).json({ message: 'Error al eliminar solicitud de cambio', error: error.message, status: false });
    }
  }
}

module.exports = CambioController;
