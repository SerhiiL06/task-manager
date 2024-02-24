const mongoose = require('mongoose')

require('dotenv').config()

const mongoDb = mongoose.connect(process.env.MONDO_URL, () => console.log('Okey mongo'))



module.exports.mongo = { mongoDb }