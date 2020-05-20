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
  titulo: String,
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
    enum: ['Aberto', 'Em Andamento', 'Fechado'],
    required: true
  },
  anexo: []
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