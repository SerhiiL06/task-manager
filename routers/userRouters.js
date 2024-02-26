const { User } = require('../schemes/userSchemes')
const { Router } = require('express')
const { authMiddleware } = require('../middlewares/jwtMiddle')
const userRouters = Router()
const { user404 } = require('./errorHandle')

userRouters.get('/users', authMiddleware, async (req, res) => {
    const users = await User.find({}, { 'email': 1, 'role': 1 })

    return res.json(users)
})


userRouters.get('/users/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        return res.status(200).json({ 'user': user })
    } catch (error) {
        return user404(req.params.userId, res)
    }
})




module.exports.userRouters = userRouters