const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect(process.env.MONGO_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});



// const newTask = new Task({
//     description: " chicken nuggets"
// });

// newTask.save().then(res=>console.log(res)).catch(err=>console.log(err));