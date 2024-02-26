const { Task } = require('../schemes/taskSchemes')
const { Router } = require('express')
const { authMiddleware } = require('../middlewares/jwtMiddle')
const { taskValidator } = require('../validators/taskValidators')


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


taskRouters.get('/tasks/my', async (req, res) => {
    const userTasks = await Task.find({ 'ownerId': req.user._id }, { 'title': 1, 'description': 1, 'complete': 1 })
        .sort('createdAt')
    return res.status(200).json({ 'tasks': userTasks })
})



taskRouters.patch('/tasks', async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.body.taskId, { 'complete': true })

    return res.json({ 'updated': updatedTask.complete })
})


module.exports = { taskRouters }