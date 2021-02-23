const express = require('express');
require('./db/mongoose');
// const User = require('./models/user');
const Task = require('./models/task');
const User = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/users', (req, res)=>{
    User.find({}).then(users=>res.send(users)).catch(e=>res.send(e));   
})

// app.get('/users/:id', (req, res)=>{
//     const _id = req.params.id;
//     User.findById(_id).then(user=>{
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user);
//     }).catch(e=>res.status(500).send(e))
// })

// app.post('/tasks', (req, res)=>{
//     const task = new Task(req.body);

//     task.save().then(()=>res.send(task)).catch(e=>res.status(400).send(e));
// })

// app.post('/users', async (req, res)=>{
//     const user = new User(req.body);

//     try {
//         await user.save();
//         res.status(201).send(user);
//     } catch(e) {
//         res.status(400).send(e);
//     }

//     // user.save().then(()=>{
//     //     res.send(user);
//     // }).catch((e)=>{
//     //     res.send(e)
//     // })
//     // console.log(req);
// });

// app.get('/tasks', async (req,res)=>{
//     // Task.find({}).then(tasks=>res.send(tasks)).catch(e=>res.status(500).send(e));
//     const task = await Task.find({});
//     try {
//         res.send(task);
//     } catch(e) {
//         res.send(e);
//     }
// })

// app.get('/tasks/:id', async (req, res)=>{
//     const _id = req.params.id;
//     // Task.findById(_id).then(task=>res.send(task)).catch(e=>res.status(500).send(e));
//     const task = await Task.findById(_id);
//     try {
//         res.send(task);
//     } catch(e) {
//         res.status(500).send(e);
//     }
// })

// app.patch('/users/:id', async (req, res)=>{
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ['name','email','password','age'];
//     const isValidOperation = updates.every(update=>allowedUpdates.includes(update))
//     if(!isValidOperation){
//         return res.status(400).send({error: 'Invalid'});
//     }

//     try {
//         const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
//         if(!user){
//             return res.status(404).send();
//         }
//         res.send(user);
//     } catch(e) {
//         res.status(400).send();
//     }
// })

// app.patch('/tasks/:id', async (req, res)=> {
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ["description", "completed"];
//     const isValidOperation = updates.every(update=>allowedUpdates.includes(update))
//     if(!isValidOperation){
//         return res.status(400).send({error: 'Invalid'});
//     }
//     try{
//         const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
//         if(!task){
//             return res.status(404).send;
//         }
//         res.send(task);
//     } catch(e){
//         res.status(400).send(e);
//     }
// })

// app.delete('/users/:id', async (req, res)=>{
//     try {
//         const user = await User.findByIdAndDelete(req.params.id);
//         if(!user) return res.status(404).send();
//         res.send(user);
//     } catch (e) {
//         res.status(500).send()
//     }
// })

const router = new express.Router();

app.delete('/tasks/:id', async (req, res)=>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task) return res.status(400).send();
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
})


app.listen(port, ()=>{
    console.log('Server is up on port ' + port);
});




