const User = require('../models/User')

// index, show, store, update, destroy

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
    

    
  },

  async destroy(req, res) {
    const { cpf } = req.params

    // console.log(textTransform)


   await User.findOneAndDelete({ cpf }, (err) => {
      if(err) {
        req.flash("error", err);
        return res.json(err);
      }
      return res.json("O usuario foi deletado!");
    });

    
  },

  async index(req, res) {
    const listUser = await User.find()
    console.log(listUser.length);
    if(listUser.length === 0) {
      return res.json("Lista de Usuários está Vazia");
    }
    return res.json(listUser)
  },

  async show(req, res) {
    const { id } = req.params;
    const Usuario = await User.findById(id);
    if(!Usuario) {
      return res.json("Usuario não encontrado, tente outro id!");
    }
    return res.json(Usuario);
  },
}
