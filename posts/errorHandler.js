//const { celebrate, Joi, errors, Segments, isCelebrateError,CelebrateError } = require('celebrate');
const celebrate=require("celebrate")
const errorHandler = (error, req, res, next) => {
   
    console.log(error, "&&&&&&&&&&&&&", error.details)
    ;
    let myerror=JSON.stringify(error.details)
    console.log(",,,,,,,,",myerror)
    if (celebrate.isCelebrateError(error)) {
         res.send({
            success: false,
            statusCode: 400,
            key: error.details,
            message: error
        });
        // res.send({ httpCode: 400, status: 400, message: error })
    }
    else {
        res.send({ httpCode: 500, status: 500, message: "Internal server error" })
    }


}

const invalidRoute = (req, res, next) => {
    res.send({ http: 404, status: 404, message: "Route not found" })
}

module.exports = { errorHandler, invalidRoute }