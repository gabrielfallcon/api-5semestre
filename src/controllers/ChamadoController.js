const Chamado = require('../models/Chamado');
const Service = require('../models/Service');
const User = require('../models/User');
const Avaliacao = require('../models/Avalicoes');

module.exports = {
  async storage(req, res) {
    const { filename } = req.file;
    const { 
      prestadorId,
      clienteId,
      servicoId,
      descricao,
      endereco,
      lat,
      lon,
    } = req.body;

    const cliente = await User.findById(clienteId);
    const prestador = await User.findById(prestadorId);
    const servico = await Service.findById(servicoId);

    if (!cliente || !prestador) return res.status(400).json({message: 'Client or Provider does not exists'});

    if (!servico) return res.status(400).json({message: 'Service does not exists'});

    const createChamado = await Chamado.create({
      prestador: prestadorId,
      cliente: clienteId,
      servico: servicoId,
      data: new Date().toString(),
      descricao: descricao,
      endereco: endereco,
      lat: lat,
      lon: lon,
      status: 'Aberto',
      anexo: filename
    });

    return res.json(createChamado);


  },

  async index(req, res) {
    const listChamado = await Chamado.find();
    if(listChamado.length === 0) {
      return res.json("Lista de Chamados Vazia");
    }
    return res.json(listChamado);
  }

}