const mongoose = require('mongoose');
const AvaliacaoSchema = require('./Avalicoes');

const ChamadoSchema = new mongoose.Schema ({
  prestador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
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
  titulo: String,
  descricao: String,
  endereco: {
    type: String,
    required: false,
  },
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
    enum: ['Aberto', 'Em Andamento', 'Fechado'],
    required: true
  },
  avaliado: {
    type: Boolean,
    required: false
  },
  anexo: {
    type: Array,
    required: false
  }
}, {
  toJSON: {
    virtuals: true,
  },
});

ChamadoSchema.virtual('anexoUrl').get(function() {
  const arr = this.anexo;
  const filename = arr.map(obj => {
    return `http://192.168.0.26:3333/files/${obj}`
  });
  return filename;
})

module.exports = mongoose.model('Chamado', ChamadoSchema);