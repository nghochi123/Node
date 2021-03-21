const socket = io();

socket.on('message', (message)=>{
    console.log(message)
})



document.querySelector('#message-form').addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = document.querySelector('#message').value
    socket.emit('sendMessage', message);
    document.querySelector('#message').value = ""
})

document.querySelector('#send-location').addEventListener('click', ()=>{
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser');
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position);
        const location = {latitude: position.coords.latitude.toFixed(5), longitude: position.coords.longitude.toFixed(5)};
        socket.emit('sendLocation', location)
    })
})