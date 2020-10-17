const { celebrate, Joi, errors, Segments } = require('celebrate');
const VALIDATIONS = {
    NAME: Joi.string().required(),
    EMAIL: Joi.string().required(),
    PASSWORD: Joi.string().required().min(5)
}

module.exports = { VALIDATIONS }