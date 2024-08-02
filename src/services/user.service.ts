import UserRepository from "../repositories/user.repository";

export default class UserService{

   private userRepository: UserRepository = new UserRepository();

    async validateLogin(email: string, password:string) : Promise<boolean> {
       const valid =  await this.userRepository.findByEmailAndPassword(email, password);

       if(valid === null){
           throw new Error("User not found");
       }

       return true;

    }
}