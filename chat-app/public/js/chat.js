const socket = io();

const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');

const $locationButton = document.querySelector('#send-location');

const $messages = document.querySelector('#messages');

const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;

const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true})


socket.on('message', (message)=>{
    console.log(message);
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend', html)
});
socket.on('sendLocation', (location)=>{
    console.log(location);
    const html = Mustache.render(locationTemplate, {
        url: location.location,
        createdAt: moment(location.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

$messageForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    $messageFormButton.setAttribute('disabled', 'disabled');
    const message = document.querySelector('#message').value
    socket.emit('sendMessage', message, (error)=>{
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();
        if(error){
            return console.log(error);
        } 
        console.log('Message delivered!');
    });
})

$locationButton.addEventListener('click', ()=>{
    $locationButton.setAttribute('disabled', 'disabled');
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser');
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        $locationButton.removeAttribute('disabled');
        console.log(position);
        const location = {latitude: position.coords.latitude.toFixed(5), longitude: position.coords.longitude.toFixed(5)};
        socket.emit('sendLocation', location, ()=>{
            console.log('Location Shared!')
        })
    })
})

socket.emit('join', {username, room});