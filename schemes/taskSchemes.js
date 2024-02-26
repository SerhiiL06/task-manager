const { binary, string } = require('joi')
const { Schema, default: mongoose } = require('mongoose')


const taskSchema = new Schema({
    title: {
        type: String,
        maxLength: 50,
        required: true
    },
    description: {
        type: String,
        maxLength: 150,
        required: true
    },
    ownerId: { type: String },
    complete: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now
    }

})


const Task = mongoose.model('Task', taskSchema)


module.exports = { Task }