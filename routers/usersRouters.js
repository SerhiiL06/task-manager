const { Router } = require('express')
const { registerValidator } = require('../validators/userValidators')
const { User } = require('../schemes/userSchemes')
const userRouter = Router()


userRouter.post('/register', async (req, res) => {
    const { error } = registerValidator.validate(req.body)

    if (error) {
        return res.status(400).json({ 'error': error.details[0].message })
    }

    const checkExists = await User.find({ 'email': req.body.email })

    if (checkExists.length) {
        return res.status(400).json({ 'error': 'user with this email already exists' })
    }
    const us = await User.create({ email: req.body.email, password: req.body.password1 })

    return res.json({ 'ok': us.email })

})



module.exports = { userRouter }