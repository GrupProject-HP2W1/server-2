const { History } = require('../models')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (request, response, next) => {
    try{
        let decoded = jwt.verify(request.headers.token, process.env.JWT_SECRET)
        let history_id = request.params.id
        History.findByPk(history_id)
        .then( result => {
            if(result){
                if(result.user_id == decoded.id){
                    next()
                }else{
                    next({
                        status_code: 400,
                        type: 'Bad Request',
                        message: 'unauthorized user'
                    })
                }
            }else{
                next({
                    status_code: 404,
                    type: 'Not Found',
                    message: 'Data Not Found'
                })
            }
        } )
    }catch(err){
        next({
            status_code: 400,
            type: 'Bad Request',
            message: 'unauthorized user'
        })
    }
}