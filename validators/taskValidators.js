const Joi = require('joi')
const { model } = require('mongoose')



const taskValidator = Joi.object({
    title: Joi.string().max(50).required(),
    description: Joi.string().max(50).required()
})


module.exports = { taskValidator }