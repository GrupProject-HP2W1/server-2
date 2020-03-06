const routerUser = require('express').Router()
const UserController = require('../Controllers/UserController')

routerUser.post('/login', UserController.login)
routerUser.post('/register', UserController.register) 
routerUser.post('/registerGoogle', UserController.loginGoogle)

module.exports = routerUser