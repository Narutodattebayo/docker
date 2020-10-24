const jwt = require("jsonwebtoken")
const CONSTANT = require("./constants").CONSTANTS
const redis = require('./redis/redis').REDIS
const MIDDLEWARE = {
    userSession: async (req, res, next) => {
        try {
            if (req.headers && req.headers.authorization) {
                let data = req.headers.authorization.split(" ")
                console.log(data)
                if (data[0] == "Bearer" && data[1].length) {
                    let decrypted = await jwt.verify(data[1], CONSTANT.SECRET_KEY)
                    if (decrypted) {
                        let userDetails = await redis.getUserData(decrypted.sessionId)
                        if (userDetails) {
                            res.locals.userData = JSON.parse(userDetails)
                            res.locals.userData.sessionId = decrypted.sessionId
                            console.log("going to route now.........")
                            next()
                        } else res.send({ http: 400, status: 400, message: "Session Expired" })

                    }

                } else res.send({ http: 400, status: 400, message: "You are not authorised to perform this action" })
            } else {
                res.send({ http: 400, status: 400, message: "You are not authorised to perform this action" })
            }
        } catch (err) {
            res.send({ http: 400, status: 400, message: "Invalid access Token" })
        }

    }
}
module.exports = { MIDDLEWARE }