const { User } = require('../models')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (request, response, next) => {
    try {
        let decoded = jwt.verify(request.headers.token, process.env.JWT_SECRET)
        User.findOne({
            where:{
                email: decoded.email
            }
        })
        .then( result => {
            if(result){
                request.userData = decoded
                next()
            }else{
                throw {
                    status_code: 400,
                    type: 'Bad Request',
                    message: 'unauthenticated user'
                }
            }
        } )
    } catch(err) {
        next({
            status_code: 400,
            type: 'Bad Request',
            message: 'unauthenticated user'
        })
    }
}