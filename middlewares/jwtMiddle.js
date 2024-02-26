require('dotenv').config()
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(403).json({ 'error': 'not authorization request' })
    }
    const token = req.headers.authorization.split(' ')[1]

    try {
        req.user = jwt.verify(token, process.env.SECRET_KEY)
        next()
    } catch (error) {
        return res.json({ 'error': 'token error' })
    }

}


module.exports = { authMiddleware }