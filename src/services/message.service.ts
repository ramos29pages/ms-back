import { Socket, Server } from 'socket.io';

interface PrivateMessageData {
  receiverId: string;
  message: string;
  senderId: string;
}

interface UserManager {
  getSocketIdByUserId(userId: string): string | null;
}

export class MessageManager {
  private userManager: UserManager;
  private io: Server;

  constructor(io: Server, userManager: UserManager) {
    this.io = io;
    this.userManager = userManager;
  }

  handlePrivateMessage(_socket: Socket, data: PrivateMessageData): void {
    const { receiverId, message, senderId } = data;
    const receiverSocketId = this.userManager.getSocketIdByUserId(receiverId);

    if (receiverSocketId) {
      this.io.to(receiverSocketId).emit('private_message', {
        message,
        senderId,
      });
    } else {
      console.log('User not connected:', receiverId);
    }
  }
}