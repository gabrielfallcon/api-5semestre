const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController');
const ServiceController = require('./controllers/ServiceController');
const LoginController = require('./controllers/LoginController');
const ChamadoController = require('./controllers/ChamadoController');

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

// Cadastro de Chamado
routes.post('/chamado', upload.single('anexos'), ChamadoController.storage);
routes.post('/chamado/:id', ChamadoController.update);
routes.get('/chamado', ChamadoController.index);
routes.delete('/chamado/:id', ChamadoController.destroy);

// Login de Admin 
routes.post('/loginWeb', LoginController.showAdmin);
routes.post('/loginApp', LoginController.showUser);

module.exports = routes;