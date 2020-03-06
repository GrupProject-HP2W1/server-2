const axios = require('axios')
require('dotenv').config()

module.exports = (request, response) => {
    let latitude = request.query.latitude
    let longitude = request.query.longitude

    axios({
        method: 'get',
        url: `https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${latitude},${longitude}`
    })
    .then( result => {

    } )
    .catch( err => {

    } )
}