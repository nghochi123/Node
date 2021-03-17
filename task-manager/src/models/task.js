const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }

}, {
    timestamps: true
})

taskSchema.pre('save', function(next) {
    console.log('Hello');
    next();
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;