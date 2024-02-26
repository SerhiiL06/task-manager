const { Task } = require('../schemes/taskSchemes')
const { Router } = require('express')
const { authMiddleware } = require('../middlewares/jwtMiddle')
const { taskValidator } = require('../validators/taskValidators')
const { model } = require('mongoose')

const taskRouters = Router()

taskRouters.use(authMiddleware)

taskRouters.post('/tasks', async (req, res) => {
    const { error } = taskValidator.validate(req.body)


    if (error) {
        return res.json({ 'error': error.details[0].message })
    }

    const dataToSave = { title: req.body.title, description: req.body.description, ownerId: req.user._id }
    const newTask = await Task.create(dataToSave)

    return res.status(201).json({ 'create': newTask._id })
})



module.exports = { taskRouters }