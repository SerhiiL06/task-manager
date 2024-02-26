const Joi = require('joi')

const passwordValidator = Joi.string().min(5).max(50).required()

const registerValidator = Joi.object({
    email: Joi.string().min(5).max(50).required(),
    password1: passwordValidator,
    password2: passwordValidator
})



const loginValidator = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})


module.exports = { registerValidator, loginValidator }