import app from './app';
import http from 'http';
import {Server} from 'socket.io';
import { setupWebSocket} from './websockets';

const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, {
    pingTimeout: 10000,  // tiempo de espera del ping
    pingInterval: 5000   // Intervalo para chequear la conexión
  });


setupWebSocket(io);

server.listen(port, ()=>{
    console.log('Environment Variables:', process.env);
    console.log('listening on port::: ', port);
});