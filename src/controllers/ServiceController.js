const Service = require('../models/Service')
const User = require('../models/User')

module.exports = {
  async index(req, res) {
    const listService = await Service.find()

    return res.json(listService)
  },

  async storage(req, res) {
    const { filename } = req.file
    const { name, description } = req.body
    const { user_id } = req.headers

    const user = await User.findById(user_id)

    

    if (!user) {
      return res.status(400).json({message: 'User does not exists'})
    }

    const createdService = await Service.create({ 
      user: user_id,
      imageService: filename,
      name, 
      description 
    })

    return res.json(createdService)
  }
}