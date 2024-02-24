const Joi = require('joi')

const passwordValidator = Joi.string().min(5).max(50).required()

const registerValidator = Joi.object({
    email: Joi.string().min(5).max(50).required(),
    password1: passwordValidator,
    password2: passwordValidator
})



module.exports = { registerValidator }