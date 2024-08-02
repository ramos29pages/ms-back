import { Server } from 'socket.io';
// import { verifyToken } from '../utils/auth';
// import { ChatService } from '../services/chatService';
// import { UserService } from '../services/userService';

export function setupWebSockets(io: Server) {
    console.log(io);

    /****
  const chatService = new ChatService();
  const userService = new UserService();

  io.use(async (socket: Socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      const decoded = await verifyToken(token);
      socket.data.userId = decoded.userId;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket: Socket) => {
    console.log('New client connected');

    socket.on('join_room', async (roomId: string) => {
      socket.join(roomId);
      const messages = await chatService.getRoomMessages(roomId);
      socket.emit('room_messages', messages);
    });

    socket.on('send_message', async (data: { roomId: string, message: string }) => {
      const { roomId, message } = data;
      const userId = socket.data.userId;
      const newMessage = await chatService.createMessage(userId, roomId, message);
      io.to(roomId).emit('new_message', newMessage);
    });

    socket.on('typing', (roomId: string) => {
      socket.to(roomId).emit('user_typing', socket.data.userId);
    });

    socket.on('stop_typing', (roomId: string) => {
      socket.to(roomId).emit('user_stop_typing', socket.data.userId);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

    ***/  
}