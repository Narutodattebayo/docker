const { celebrate, Joi, errors, Segments,isCelebrateError } = require('celebrate');

const errorHandler = (error, req, res, next) => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",typeof(error))
    console.log(error.details,"?????????/",isCelebrateError(error))
    if (isCelebrateError(error)) {
        res.send({ httpCode: 400, status: 400, message: error })
    } else {
        res.send({ httpCode: 500, status: 500, message: "Internal server error" })
    }

}

const invalidRoute=(req,res,next)=>{
    res.send({http:404,status:404,message:"Route not found"})
}

module.exports = { errorHandler,invalidRoute }