// client.js
const { Console } = require('console');
const io = require('socket.io-client');
const socket = io('http://localhost:3000'); // Cambia la URL según tu servidor
socket.emit('register', '2000');

    socket.emit('private_message', { receiverId : 1999, message: 'MENSAJE DESDE 2000' });

socket.on('private_message', (data) => {
    console.log('MENSAJE RECIBIDO DESDE 1999');
    console.log('Mensaje privado recibido:', data);
});

socket.on('new_member', (data) => { console.log(data);});

