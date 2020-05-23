const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  avaliacao: {
    type: Array,
    required: false
  },
  cpf: String,
  password: String,
  address: String,
  number: String,
  typeuser: String,
})

module.exports = mongoose.model('User', UserSchema)