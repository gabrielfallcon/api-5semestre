const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema  ({
  name: String,
  imageService: String,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  toJSON: {
    virtuals: true,
  },
});

ServiceSchema.virtual('imageService_url').get(function() {
  return `http://localhost:3333/files/${this.imageService}`
})

module.exports = mongoose.model('Service', ServiceSchema)