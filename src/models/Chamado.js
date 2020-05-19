const mongoose = require('mongoose');
const AvaliacaoSchema = require('./Avalicoes');

const ChamadoSchema = new mongoose.Schema ({
  prestador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  servico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  },
  data: String,
  descricao: String,
  endereco: String,
  lat: {
    type: String,
    required: false
  },
  lon: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['Aberto', 'Aceito', 'Fechado'],
    required: true
  },
  anexo: []
});

module.exports = mongoose.model('Chamado', ChamadoSchema);