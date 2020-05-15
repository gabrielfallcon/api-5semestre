const User = require('../models/User')

module.exports = {
  async store(req, res) {
    const { cpf, password } = req.body

    const existsUser = await User.findOne({ cpf: cpf })

    if (
        !existsUser || 
        existsUser.password !== password || 
        existsUser.typeuser !== 'admin'
      ) {
      return res.json({ message: 'Usuário inválido', status: false })
    }

    return res.status(200).json({ status: true, _id: existsUser._id })
  }
}