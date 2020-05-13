const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController');
const ServiceController = require('./controllers/ServiceController');

const routes = express.Router();
const upload = multer(uploadConfig);

// Cadastro de Usuario - A mudar
routes.post('/sessions', SessionController.store);

// Cadastro de Usuario
routes.post('/users', UserController.store);
// Obtem lista de todos usuarios
routes.get('/users', UserController.index);
//Deletar Usuarios
routes.delete('/users/:cpf', UserController.destroy);

// Cadastro de Servico 
routes.get('/services', ServiceController.index);
routes.post('/services', upload.single('imageService') , ServiceController.storage);
routes.delete('/services/:id', ServiceController.destroy);

module.exports = routes