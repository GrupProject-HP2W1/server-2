const router = require('express').Router()

router.use('/user', require('./routerUser'))
router.use('/weather', require('./routerWeather'))
router.use('/history', require('./routerHistory'))

module.exports = router