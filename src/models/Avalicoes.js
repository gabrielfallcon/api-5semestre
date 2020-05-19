const mongoose = require('mongoose');

const AvalicoesSchema = new mongoose.Schema ({
  prestador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  chamado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chamado'
  },
  avalicao: Number,
});

module.exports = mongoose.model('Avalicoes', AvalicoesSchema);