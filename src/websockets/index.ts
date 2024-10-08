import { Server, Socket } from "socket.io";
// import { verifyToken } from '../utils/auth';
// import { ChatService } from '../services/chatService';
// import { UserService } from '../services/userService';
import { Server as HttpServer } from "http";
import { UserManager } from "../services/user.service";
import { CallManager } from "../services/call.service";
import { MessageManager } from "../services/message.service";

// export function setupWebSockets(io: Server) {
//     console.log('WEBSOCKET:: ',io);

//     /****
//   const chatService = new ChatService();
//   const userService = new UserService();

//   io.use(async (socket: Socket, next) => {
//     try {
//       const token = socket.handshake.auth.token;
//       const decoded = await verifyToken(token);
//       socket.data.userId = decoded.userId;
//       next();
//     } catch (error) {
//       next(new Error('Authentication error'));
//     }
//   });

//     ***/

//   io.on('connection', (socket: Socket) => {
//     console.log('New client connected', socket);

//     socket.on('join_room', async (roomId: string) => {
//       socket.join(roomId);
//       // const messages = await chatService.getRoomMessages(roomId);
//       // socket.emit('room_messages', messages);
//     });

//     socket.on('chat message', async (msg: string) => {
//       console.log('Chat ', msg);
//     });

//     // socket.on('send_message', async (data: { roomId: string, message: string }) => {
//     //   // const { roomId, message } = data;
//     //   // const userId = socket.data.userId;
//     //   // // const newMessage = await chatService.createMessage(userId, roomId, message);
//     //   // // io.to(roomId).emit('new_message', newMessage);
//     // });

//     socket.on('typing', (roomId: string) => {
//       socket.to(roomId).emit('user_typing', socket.data.userId);
//     });

//     socket.on('stop_typing', (roomId: string) => {
//       socket.to(roomId).emit('user_stop_typing', socket.data.userId);
//     });

//     socket.on('disconnect', () => {
//       console.log('Client disconnected');
//     });
//   });

//   console.log('Client is ready');
// }

export function setupWebSocket( io: Server): Server {

    const userManager = new UserManager();
  const callManager = new CallManager(io, userManager);
  const messageManager = new MessageManager(io, userManager);

  io.on("connection", (socket: Socket) => {
    console.log("A user connected:", socket.id);

    socket.on("register", (userId: string) => {
      userManager.registerUser(userId, socket.id);
      socket.broadcast.emit("new_member", `A NEW MEMBER CONNECTED: ${userId}`);
    });

    // Manejo de reconexión
    socket.on("reconnect_attempt", () => {
      console.log("User is trying to reconnect:", socket.id);
      socket.emit("reconnection_in_progress");
    });

    // Evento para degradar la calidad en condiciones de red débiles
    socket.on("network_quality", (quality: string) => {
      if (quality === "low") {
        socket.emit("adjust_call_quality", { resolution: "low", bitrate: 300 });
      }
    });

    socket.on("call_request", (data: any) => {
      callManager.handleCallRequest(socket, data);
    });

    socket.on("call_response", (data: any) => {
      callManager.handleCallResponse(socket, data);
    });

    socket.on("call_end", (data: any) => {
      callManager.handleCallEnd(socket, data);
    });

    socket.on("private_message", (data: any) => {
      messageManager.handlePrivateMessage(socket, data);
    });

    socket.on("disconnect", () => {
      userManager.unregisterUser(socket.id);
    });
  });

  return io;
}
