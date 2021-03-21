const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.json());
app.use(express.static(publicDirectoryPath));



io.on('connection',(socket)=>{
    console.log('New WebSocket Connection');
    socket.broadcast.emit('message', 'A new user has joined');
    socket.emit('message', 'Welcome')
    socket.on('sendMessage', (message)=>{
        io.emit('message', message);
    })
    socket.on('sendLocation', (location)=>{
        io.emit('message', `https://google.com/maps?q=${location.latitude},${location.longitude}`);
    })
    socket.on('disconnect', ()=>{
        io.emit('message', 'A user has disconnected!')
    })
})

server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
})