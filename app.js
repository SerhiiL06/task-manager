const express = require('express')
const { User } = require('./schemes/userSchemes')
const { userRouter } = require('./routers/usersRouters')

const mongoose = require('mongoose')

require('dotenv').config()


const app = express()

mongoose.connect(process.env.MONDO_URL).then(() => console.log('Okey mongo'))

app.use(express.json())

app.use('/v1', userRouter)



app.listen(3000, () => console.log('Server was started'))