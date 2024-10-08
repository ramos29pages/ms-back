import { Socket } from 'socket.io';
import SimplePeer from 'simple-peer';

interface CallData {
  callerId: string;
  receiverId: string;
  stream: MediaStream;
}

interface SignalData {
  callerId: string;
  signal: SimplePeer.SignalData;
}

interface ActiveCall {
  peer: SimplePeer.Instance;
  callerId: string;
}

export class CallManager {
  private io: any;
  private activeCalls: { [key: string]: ActiveCall };
  private userManager: any; 

  constructor(io: any, userManager: any) {
    this.io = io;
    this.activeCalls = {};
    this.userManager = userManager;
  }

  handleCallRequest(_socket: Socket, data: CallData): void {
    const { callerId, receiverId, stream } = data;
    const receiverSocketId = this.userManager.getSocketIdByUserId(receiverId);

    if (receiverSocketId) {
      // Crear una nueva instancia de Peer para el receptor
      const peer = new SimplePeer({ initiator: true, stream });
      this.activeCalls[receiverId] = { peer, callerId };

      peer.on('signal', (signal: SimplePeer.SignalData) => {
        // Enviar la señal de llamada al receptor
        this.io.to(receiverSocketId).emit('call_request', {
          callerId,
          signal,
        });
      });
    } else {
      console.log('User not connected:', receiverId);
    }
  }

  handleCallResponse(_socket: Socket, data: SignalData): void {
    const { callerId, signal } = data;
    const activeCall = this.activeCalls[callerId];

    if (activeCall?.peer) {
      // Enviar la señal de respuesta al iniciador de la llamada
      activeCall.peer.signal(signal);
    } else {
      console.log('No active call found for caller:', callerId);
    }
  }

  handleCallEnd(_socket: Socket, data: { callerId: string }): void {
    const { callerId } = data;
    const activeCall = this.activeCalls[callerId];

    if (activeCall?.peer) {
      // Finalizar la llamada
      activeCall.peer.destroy();
      delete this.activeCalls[callerId];
    } else {
      console.log('No active call found for caller:', callerId);
    }
  }
}