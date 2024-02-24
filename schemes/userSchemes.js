const { Schema, default: mongoose, model } = require('mongoose')


const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: false
    },
    last_name: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: false
    },
    role: {
        type: String,
        default: 'Default',
        enum: ['Admin', 'Default']
    },
    password: {
        type: String,
        require: true
    },
})



const User = mongoose.model('User', userSchema)


module.exports = { User }