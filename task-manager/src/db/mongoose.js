const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});



// const newTask = new Task({
//     description: " chicken nuggets"
// });

// newTask.save().then(res=>console.log(res)).catch(err=>console.log(err));