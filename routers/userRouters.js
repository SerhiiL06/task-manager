const { User } = require('../schemes/userSchemes')
const { Router } = require('express')
const { authMiddleware } = require('../middlewares/jwtMiddle')

const userRouters = Router()


userRouters.get('/users', authMiddleware, async (req, res) => {
    const userList = await User.find()

    console.log(req.user)

    return res.json(userList)
})


module.exports.userRouters = userRouters