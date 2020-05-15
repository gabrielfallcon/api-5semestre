const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cpf: String,
  password: String,
  address: String,
  number: String,
  typeuser: String,
})

module.exports = mongoose.model('User', UserSchema)