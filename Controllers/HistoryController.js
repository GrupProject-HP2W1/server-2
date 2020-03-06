const { History } = require('../models')

class HistoryController {
    static create(request, response, next) {
        let newData = {
            city: request.body.city,
            date: new Date(),
            lat: request.body.lat,
            long: request.body.long,
            weather: request.body.weather,
            temperature: request.body.temperature,
            user_id: request.userData.id
        }
        console.log(newData)
        History.create(newData)
        .then( result => {
            response.status(201).json(result)
        } )
        .catch( err => {
            response.json(err)
        } )
    }

    static listAll(request, response, next) {
        History.findAll({
            where:{
                user_id: request.userData.id
            },
            order: [
                ['date', 'DESC']
            ]
        })
        .then( result => {
            response.status(200).json(result)
        } )
        .catch( err => {
            response.json(err)
        } )
    }

    static delete(request, response, next) {
        let delete_id = request.params.id
        History.destroy({
            where:{
                id: delete_id
            }
        })
        .then( result => {
            response.status(200).json(result)
        } )
        .catch( err => {
            response.json(err)
        } )
    }

}

module.exports = HistoryController