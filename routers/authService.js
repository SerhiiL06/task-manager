const { registerValidator, loginValidator } = require('../validators/userValidators')
const { hash, compare } = require('bcrypt')
const { createToken } = require('./jwtService')
const { User } = require('../schemes/userSchemes')

const registration = async (req, res) => {
    const { error } = registerValidator.validate(req.body)

    if (error) {
        return res.status(400).json({ 'error': error.details[0].message })
    }

    const checkExists = await User.find({ 'email': req.body.email })

    if (checkExists.length) {
        return res.status(400).json({ 'error': 'user with this email already exists' })
    }
    const hash_password = await hash(req.body.password1, 10)
    const newUser = await User.create({ email: req.body.email, password: hash_password })

    return res.json({ 'ok': newUser.email })

}


const login = async (req, res) => {
    const { error } = loginValidator.validate(req.body)

    if (error) {
        return res.status(400).json({ 'error': error.details[0].message })
    }
    const user = await User.findOne({ email: req.body.email })

    if (user) {
        const checkPassword = await compare(req.body.password, user.password)
        if (checkPassword == true) {
            const token = createToken(user)
            return res.json({ 'access': token })
        }
    }

    return res.status(400).json({ "message": 'email or password was wrong' })


}

module.exports = { registration, login }