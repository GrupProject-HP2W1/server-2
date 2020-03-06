const routerWeather = require('express').Router()
const axios = require('axios')
require('dotenv').config()

routerWeather.post('/', (request, response, next) => {
    let latitude = request.body.lat
    let longitude = request.body.long
    axios({
        method: 'get',
        url: `https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${latitude},${longitude}`
    })
    .then( result => {
        response.status(200).json(result.data)
    } )
    .catch( err => {
        response.json(err)
    } )
} )

module.exports = routerWeather