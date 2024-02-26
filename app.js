const express = require('express')
const { authRouters } = require('./routers/authRouters')
const { userRouters } = require('./routers/userRouters')
const { taskRouters } = require('./routers/taskRouters')
const mongoose = require('mongoose')

require('dotenv').config()


const app = express()

mongoose.connect(process.env.MONDO_URL).then(() => console.log('Okey mongo'))

app.use(express.json())

app.use('/v1', authRouters)
app.use('/v1', userRouters)
app.use('/v1', taskRouters)



app.listen(3000, () => console.log('Server was started'))