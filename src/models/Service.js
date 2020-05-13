const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema  ({
  name: String,
  imageService: String,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Service', ServiceSchema)