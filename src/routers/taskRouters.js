const { Router } = require('express')
const { authMiddleware } = require('../../middlewares/jwtMiddle')
const { createTask, myTasks, updateTask, taskList } = require('../services/taskService')

const taskRouters = Router()

taskRouters.use(authMiddleware)

taskRouters.post('/tasks', createTask)

taskRouters.get('/tasks', taskList)

taskRouters.get('/tasks/my', myTasks)



taskRouters.patch('/tasks', updateTask)


module.exports = { taskRouters }