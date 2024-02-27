const jwt = require('jsonwebtoken')
require('dotenv').config()

const createToken = (data) => {
    const payload = { userId: data._id, role: data.role }
    return jwt.sign(payload, process.env.SECRET_KEY)
}



module.exports = { createToken }