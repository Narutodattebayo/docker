
const router = require('express').Router();
const { celebrate, Joi, errors, Segments } = require('celebrate');
const VALIDATIONS = require('./validations').VALIDATIONS
const postModel = require('../models/post.model')
const databaseService = require('../entity/baseEntity').databaseService
const crypto = require("crypto")
const Constants = require("../constants").CONSTANTS
const Redis = require('../redis/redis').REDIS
const jwt = require("jsonwebtoken")
const userMiddleware = require('../user.middleware').MIDDLEWARE
const queries = require("../queries").queries

router.post('/createPost',
    celebrate({
        body: {
            post: Joi.string().required(),
            image: VALIDATIONS.IMAGE
        }
    }),
    userMiddleware.userSession,
    async (req, res, next) => {
        try {
            let payload = req.body;
            payload.userName = res.locals.userData.name;
            payload.userEmail = res.locals.userData.email;
            payload.userId = res.locals.userData.userId
            console.log(payload, "????????")
            let data = await databaseService.insert(postModel, payload);
            console.log("data saved.........", data)
            res.send({ httpCode: 200, status: 200, message: "Post added successfully" })

        } catch (err) {
            next(err)
        }

    })

router.get('/home', userMiddleware.userSession, async (req, res, next) => {
    let pipeline = queries.allPosts(res.locals.userData.userId)
    let data = await databaseService.basicAggregation(postModel, pipeline)
    return res.send({http:200,status:200,data:data})

})





module.exports = { router }