const User = require('../models/User')

module.exports = {
  async store(req, res) {
    const { cpf, password } = req.body

    const existsUser = await User.findOne({ cpf: cpf })

    if (!existsUser) {
      return res.status(400).json({ message: 'Usuário inválido' })
    }

    return res.status(200).json({ status: true })
  }
}