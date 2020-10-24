const { Joi  } = require('celebrate');
const VALIDATIONS = {
    NAME: Joi.string().required(),
    EMAIL: Joi.string().required(),
    PASSWORD: Joi.string().required().min(5),
    POST:Joi.string().required(),
    IMAGE:Joi.string().optional()
}

module.exports = { VALIDATIONS }