const User = require('../models/User');
const Chamado = require('../models/Chamado');

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

  async updateAvaliacao(req, res) {
    const {providerId, clienteId, chamadoId, vote} = req.body

    const provider = await User.findById(providerId);
    const cliente = await User.findById(clienteId);
    const chamado = await Chamado.findById(chamadoId);

    if(!provider || !cliente || !chamado) 
      return res.status(400).
      json("O cliente, proverdor ou chamado não existe, tente outros id's");

    let data = provider.avaliacao;
    provider.avaliacao = [...data, {
      cliente: clienteId,
      vote: vote
    }]

    await provider.save();

    chamado.avaliado = true;
    await chamado.save();

    return res.json("Voto realizado com sucesso!");
  },

  async updateUser(req, res) {
    const { name, cpf, password, address, number, typeuser } = req.body
    const { id } = req.params;

    const usr = await User.findById(id);
    
    if(!usr) 
      return res.status(400).
      json("Usuario nao encontrado, tente outro id!");

    usr.name = name;
    usr.cpf = cpf;
    usr.password = password;
    usr.address = address;
    usr.number = number;
    usr.typeuser = typeuser;

    await usr.save();

    return res.json("Usuario atualizado com sucesso!");

  }
}
