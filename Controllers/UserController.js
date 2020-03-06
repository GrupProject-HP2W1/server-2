const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('831032422222-1vo1hs36kr7vtu6vajsialdf5bb57ms9.apps.googleusercontent.com');
const sendMail = require('../helpers/mailgun')

class UserController {
    static login(request, response, next) {
        console.log(request)
        let login_data = {
            email: request.body.email,
            password: request.body.password
        }
        let userData
        User.findOne({
            where: {
                email: login_data.email
            }
        })
        .then( result => {
            if(!result){
                throw {
                    status_code: 404,
                    message: 'email not found'
                }
            }else{
                userData = result
                return bcrypt.compare(login_data.password, result.password)
            }
        } )
        .then( result => {
            if(result){
                let token = jwt.sign({
                    id: userData.id,
                    name: userData.name,
                    email: userData.email
                }, 'rahasia')
                response.status(200).json({token})
            }else{
                throw {
                    status_code: 400,
                    message: 'Wrong Password'
                }
            }
        } )
        .catch( err => {
            next(err)
        } )
    }

    static register(request, response, next) {
        let newData = {
            name: (request.body.name=='')?null:request.body.name,
            email: (request.body.email=='')?null:request.body.email,
            password: request.body.password
        }
        User.findOne({
            where:{
                email: newData.email
            }
        })
        .then( result => {
            if(result){
                throw {
                    status_code: 400,
                    type: 'Bad Request',
                    message: 'Email already registered'
                }
            }else{
                return User.create(newData)
            }
        } )
        .then( result => {
            let token = jwt.sign({
                id: result.id,
                name: result.name,
                email: result.email
            }, 'rahasia');
            response.status(201).json({token})
        } )
        .catch( err => {
            next(err)
        } )
    }
    static loginGoogle(req, res, next) {
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: '831032422222-1vo1hs36kr7vtu6vajsialdf5bb57ms9.apps.googleusercontent.com',
        })
            .then(data => {
                const payload = data.getPayload()
                User.findOne({
                    where: {
                        email: payload.email
                    }
                })
                    .then(data => {
                        if (data) {
                        let token = jwt.sign({
                            id: data.id,
                            name: data.name,
                            email: data.email
                        }, 'rahasia')
                        res.status(200).json({ token })
                        } else {
                            let passGen = String(Math.floor(Math.random() * 100000))
                            sendMail(payload, passGen)
                            return User.create({
                            name: payload.name,
                            email: payload.email,
                            password: passGen
                        })
                    }
                    })
                    .then(data => {
                        if (data) {
                            let token = jwt.sign({
                                id: data.id,
                                name: data.name,
                                email: data.email
                            }, 'rahasia')
                            res.status(200).json({ token })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
            console.log(err)
            })
    }

}

module.exports = UserController