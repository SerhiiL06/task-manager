const { Router } = require('express')
const { registration, login } = require('../services/authService')

const authRouters = Router()


authRouters.post('/register', registration)
authRouters.post('/login', login)



module.exports = { authRouters }