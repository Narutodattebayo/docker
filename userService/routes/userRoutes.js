
const router = require('express').Router();
const { celebrate, Joi, errors, Segments } = require('celebrate');
const VALIDATIONS = require('./validations').VALIDATIONS
const userModel = require('../models/user.model')
const userSessionModel = require('../models/userSesion.model')
const databaseService = require('../entity/baseEntity').databaseService
const crypto = require("crypto")
const Constants = require("../constants").CONSTANTS
const Redis = require('../redis/redis').REDIS
const jwt = require("jsonwebtoken")
const userMiddleware = require('../user.middleware').MIDDLEWARE

router.post('/signup',
    celebrate({
        body: {
            name: VALIDATIONS.NAME,
            email: VALIDATIONS.EMAIL,
            password: VALIDATIONS.PASSWORD
        }
    }),
    async (req, res, next) => {
        try {
            let payload = req.body;
            let alreadyExistingEmail = await databaseService.findOne(userModel, { email: payload.email })
            if (!alreadyExistingEmail) {
                payload.password = await crypto.createHmac('sha256', Constants.SALT).update(payload.password).digest('hex');
                console.log(payload)
                await databaseService.insert(userModel, payload)
                res.send({ httpCode: 200, status: 200, message: "Signup Successfully" })
            } else res.send({ httpCode: 400, status: 400, message: "Email already exists" })

        } catch (err) {
            next(err)
        }

    })

router.post('/login',
    celebrate({
        body: {
            email: VALIDATIONS.EMAIL,
            password: VALIDATIONS.PASSWORD
        }
    }),
    async (req, res, next) => {
        try {
            let payload = req.body
            let alreadyExistingEmail = await databaseService.findOne(userModel, { email: payload.email })
            if (alreadyExistingEmail) {
                if (alreadyExistingEmail.password == crypto.createHmac('sha256', Constants.SALT).update(payload.password).digest('hex')) {
                    let sessionInDb = await databaseService.insert(userSessionModel, { userId: alreadyExistingEmail._id, status: "active" })
                    let jwtData = jwt.sign({ sessionId: sessionInDb._id }, Constants.SECRET_KEY)
                    console.log(jwtData)
                    let userData = {
                        name: alreadyExistingEmail.name,
                        email: alreadyExistingEmail.email,
                        userId: alreadyExistingEmail._id
                    }
                    await Redis.saveUserData(sessionInDb._id, userData)
                    userData.accessToken = jwtData
                    res.send({ httpCode: 200, status: 200, message: "LoggedIn Successfully", data: userData })
                } else res.send({ httpCode: 400, status: 400, message: "Invalid Password" })
            } else res.send({ httpCode: 400, status: 400, message: "Email not found" })
        } catch (err) {
            next(err)
        }
    })

router.get('/myProfile', userMiddleware.userSession, async (req, res, next) => {
    try {
        let userDetails = await databaseService.findOne(userModel, { _id: res.locals.userData.userId })
        return res.send({ http: 200, status: 200, data: userDetails })
    } catch (err) {
        next(err)
    }
})

router.get('/logout', userMiddleware.userSession, async (req, res, next) => {
    try {
        let userDetails = await databaseService.edit(userSessionModel, { userId: res.locals.userData.userId }, { status: "inactive" })
        console.log(res.locals.userData)
        Redis.deleteUserFromRedis(res.locals.userData.sessionId)
        return res.send({ http: 200, status: 200, data: userDetails })
    } catch (err) {
        next(err)
    }
})



module.exports = { router }