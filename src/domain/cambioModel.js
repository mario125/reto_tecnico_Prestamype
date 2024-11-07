
const mongoose = require('mongoose');

const cambioSchema = new mongoose.Schema({
  tipo_de_cambio: { type: String, enum: ['compra', 'venta'], required: true },
  tasa_de_cambio: {
    _id: String,
    purchase_price: Number,
    sale_price: Number
  },
  monto_enviar: { type: Number, required: true },
  monto_recibir: { type: Number, required: true },
  id_usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Cambio', cambioSchema);
