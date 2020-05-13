const express = require('express')
const multer = require('multer')
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController')
const ServiceController = require('./controllers/ServiceController')

const routes = express.Router()
const upload = multer(uploadConfig)

// Cadastro de Usuario
routes.post('/sessions', SessionController.store)

// Cadastro de Servico 
routes.get('/services', ServiceController.index)
routes.post('/services', upload.single('imageService') , ServiceController.storage)

module.exports = routes