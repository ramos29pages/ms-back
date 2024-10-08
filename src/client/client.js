// client.js
const io = require('socket.io-client');
const socket = io('http://localhost:3000'); // Cambia la URL según tu servidor
socket.emit('register', '1999');

socket.emit('private_message', { receiverId : 1999, message: 'MENSAJE DESDE 1999' });
socket.emit('private_message', { receiverId : 1999, message: 'MENSAJE DESDE 1999' });
socket.emit('private_message', { receiverId : 2000, message: 'MENSAJE DESDE 1999' });

socket.on('private_message', (data) => {
    console.log('Mensaje privado recibido:', data);
});

socket.on('new_member', (data) => { console.log(data);});

