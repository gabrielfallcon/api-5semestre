const Service = require('../models/Service')
const User = require('../models/User')

const path = require('path')
const fs = require('fs')

module.exports = {
  async index(req, res) {
    const listService = await Service.find()
    console.log(listService.length);
    if(listService.length === 0) {
      return res.json("Lista de Serviços Vazia");
    }
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
  },

  async destroy(req, res) {
    const {id} = req.params;

    const service = await Service.findById(id);

    const filename = service.imageService;
    const caminho = path.resolve(__dirname,'..', '..', `uploads/${filename}`);



    
    await Service.deleteOne(service, (err) => {
      if(err) {
        req.flash("error", err);
        return res.json(err);
      }

      if(fs.existsSync(caminho)) {
        fs.unlinkSync(caminho);
      }
      
      return res.json("O serviço foi deletado!");
    });
  }

}