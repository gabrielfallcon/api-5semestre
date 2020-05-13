const User = require('../models/User')

module.exports = {
  async store(req, res) {
    const { name, cpf, password, address, number, typeuser } = req.body

    // console.log(textTransform)

    const userInformations = {
      name,
      cpf,
      password,
      address,
      number,
      typeuser
    }

    // Verifica se já existe um cpf no banco 
    const existsCPF = await User.findOne({ cpf })

    if (existsCPF) {
      return res.status(400).json('you cannot register with a registered cpf')
    }

    const createdUser = await User.create(userInformations)


    return res.json(createdUser)
  }
}