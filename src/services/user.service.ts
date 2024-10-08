import UserRepository from "../repositories/user.repository";

export default class UserService{

   private userRepository: UserRepository = new UserRepository();

    async validateLogin(email: string, password:string) : Promise< {status: boolean, message: string}> {
       const valid =  await this.userRepository.findByEmailAndPassword(email, password);

       if(valid === null){
           return {status: false, message: 'Invalid Credentials.'};
       }
       return {status: true, message: 'Login succesfully.'};

    }

    async validateUsername(username: string): Promise<boolean>{
        const valid =  await this.userRepository.findByEmail(username);

        if(valid === null){
            return false;
        }
        return true;
    }
}

interface ConnectedUsers {
    [key: string]: string;
  }

export class UserManager {

    connectedUsers : ConnectedUsers = {};

    constructor() {
      this.connectedUsers = {};
    }
  
    registerUser(userId : string, socketId : string) {
      this.connectedUsers[userId] = socketId;
      console.log('User registered:', userId, 'with socket ID:', socketId);
      console.log(this.connectedUsers);
    }
  
    unregisterUser(socketId : string) {
      for (const userId in this.connectedUsers) {
        if (this.connectedUsers[userId] === socketId) {
          delete this.connectedUsers[userId];
          console.log('User disconnected:', userId);
          break;
        }
      }
    }
  
    getSocketIdByUserId(userId : string) {
      return this.connectedUsers[userId] || null;
    }
  }
  

