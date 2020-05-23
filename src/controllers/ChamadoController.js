const Chamado = require('../models/Chamado');
const Service = require('../models/Service');
const User = require('../models/User');
const Avaliacao = require('../models/Avalicoes');

module.exports = {
  async storage(req, res) {
    const file = req.files;
    
    // console.log(filename);

    const newFiles = file.map(obj => {
      return obj.filename
  });
    console.log(newFiles);
    const { 
      prestadorId,
      clienteId,
      servicoId,
      titulo,
      descricao,
      endereco,
      lat,
      lon,
    } = req.body;

    const cliente = await User.findById(clienteId);
    // const prestador = await User.findById(prestadorId);
    const servico = await Service.findById(servicoId);

    if (!cliente || !servico) return res.status(400).json({message: 'Client or Service does not exists'});

    // if (!servico) return res.status(400).json({message: 'Service does not exists'});

    const createChamado = await Chamado.create({
      prestador: prestadorId,
      cliente: clienteId,
      servico: servicoId,
      data: new Date().toString(),
      titulo: titulo,
      descricao: descricao,
      endereco: endereco,
      lat: lat,
      lon: lon,
      status: 'Aberto',
      anexo: newFiles
    });

    return res.json(createChamado);


  },

  async index(req, res) {
    const listChamado = await Chamado.find();
    if(listChamado.length === 0) {
      return res.json("Lista de Chamados Vazia");
    }
    return res.json(listChamado);
  },

  async indexByUser(req, res) {
    const { id } = req.params;
    const listChamado = await Chamado.find({cliente: id});
    if(listChamado.length === 0) return res.status(400).json("Nenhum chamado criado por este cliente foi encontrado!");
    return res.json(listChamado);
  },

  async indexByProvider(req, res) {
    const { id } = req.params;
    const listChamado = await Chamado.find({prestador: id});
    if(listChamado.length === 0) return res.status(400).json({message: "Nenhum chamado aceito ou fechado por este prestador foi encontrado!"});
    return res.json(listChamado);
  },

  async show(req, res) {
    const { id } = req.params;
    const ticket = await Chamado.findById(id);
    if(!ticket) return res.status(400).json("Nenhum chamado foi encontrado, tente outro id!");
    return res.json(ticket);
  },

  async destroy(req, res) {
    const {id} = req.params;

    const chamado = await Chamado.findById(id);
    if(!chamado) return res.status(400).json("Chamado não encontrado verifique o id!");

    await Chamado.deleteOne(chamado, (err) => {
      if(err) {
        req.flash("error", err);
        return res.json(err);
      }  
      return res.json("O chamado foi deletado!");
    });
  },

  async update(req, res) {
    const { id } = req.params
    const { provider, status } = req.body;

    const chamado = await Chamado.findById(id);
    if(!chamado) return res.status(400).json("Chamado não encontrato, tente outro id!");

    if(status === 'Em Andamento') {
      chamado.status = 'Em Andamento'
      chamado.prestador = provider;
      await chamado.save();
      return res.json(chamado);
    }
    else if(status === 'Fechado') {
      chamado.status = 'Fechado'
      await chamado.save();
      return res.json(chamado);
    }

    return res.status(400).json("Status incorreto tente novamente!");
    

    


  },

}