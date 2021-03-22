const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const Filter = require('bad-words');
const {generateMessage, generateLocation} = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.json());
app.use(express.static(publicDirectoryPath));



io.on('connection',(socket)=>{
    console.log('New WebSocket Connection');

    socket.on('join', ({username, room})=>{
        socket.join(room);
        socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined`));
        socket.emit('message', generateMessage('Welcome'))
    })

    
    socket.on('sendMessage', (message, callback)=>{
        const filter = new Filter();
        if(filter.isProfane(message)){
            return callback('Profanity is not allowed!');
        }
        io.to('hello').emit('message', generateMessage(message));
        callback()
    })
    socket.on('sendLocation', (location, callback)=>{
        io.emit('sendLocation', generateLocation(`https://google.com/maps?q=${location.latitude},${location.longitude}`));
        callback()
    })
    socket.on('disconnect', ()=>{
        io.emit('message', generateMessage('A user has disconnected'))
    })
})

server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
})