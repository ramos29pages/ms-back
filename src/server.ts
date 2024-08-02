import app from './app';
import http from 'http';
import {Server} from 'socket.io';
import { setupWebSockets} from './websockets';

const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server);


setupWebSockets(io);

server.listen(port, ()=>{
    console.log('listening on port::: ', port);
});