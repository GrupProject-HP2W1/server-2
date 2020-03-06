const routerUser = require('express').Router()
const UserController = require('../Controllers/UserController')

routerUser.post('/login', UserController.login)
routerUser.post('/register', UserController.register)

module.exports = routerUser