const express = require('express');
require('./db/mongoose');
// const User = require('./models/user');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);




app.listen(port, ()=>{
    console.log('Server is up on port ' + port);
});

const jwt = require('jsonwebtoken')

const myFunction = async () => {
    const token = jwt.sign({_id: 'abc123'}, 'hello', {expiresIn:"5 min"});
    console.log(token);

    const data = jwt.verify(token, 'hello');
    console.log(data);
}

myFunction()




