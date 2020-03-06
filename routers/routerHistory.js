const routerHistory = require('express').Router()
const HistoryController = require('../Controllers/HistoryController')
const authentication = require('../middlewares/Authentication')
const authorization = require('../middlewares/Authorization')

routerHistory.get('/', authentication, HistoryController.listAll)
routerHistory.post('/', authentication, HistoryController.create)
routerHistory.delete('/:id', authentication, authorization, HistoryController.delete)

module.exports = routerHistory