const { Task } = require('../../schemes/taskSchemes')
const { taskValidator } = require('../../validators/taskValidators')

const createTask = async (req, res) => {
    const { error } = taskValidator.validate(req.body)


    if (error) {
        return res.json({ 'error': error.details[0].message })
    }

    const dataToSave = { title: req.body.title, description: req.body.description, ownerId: req.user._id }
    const newTask = await Task.create(dataToSave)

    return res.status(201).json({ 'create': newTask._id })
}


const taskList = async (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ 'error': 'permission danied' })
    }

    const b = req.query.complete === 'true';

    const taskList = await Task.aggregate([{ $unset: ['__v', 'createAt'] }, { $match: { complete: b } }, { $sort: { 'createAt': 1 } }])

    return res.status(200).json(taskList)
}

const myTasks = async (req, res) => {
    const userTasks = await Task.find({ 'ownerId': req.user._id }, { 'title': 1, 'description': 1, 'complete': 1 })
        .sort('createdAt')
    return res.status(200).json({ 'tasks': userTasks })
}


const updateTask = async (req, res) => {
    const task = await Task.findById(req.body.taskId)
    if (req.user.userId !== task.ownerId) {
        return res.json({ 'error': 'permission denied' })
    }
    const updatedTask = await Task.findByIdAndUpdate(req.body.taskId, { 'complete': true })

    return res.json({ 'updated': updatedTask.complete })
}

module.exports = { createTask, myTasks, updateTask, taskList }