import { Request, Response} from 'express';
import { AuthService } from '../services/auth.service';
import UserService from '../services/user.service';
const authService = new AuthService();
const userService = new UserService();

export const login = async(req : Request, res : Response)=>{

    const { user, password } = req.body;
    

    if(user && password){

        await userService.validateLogin(user, password);
        const { token, refreshToken } = authService.generateTokens({user, password});

        res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict' });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, sameSite: 'strict' });

        res.status(200).json({ status: true, message : 'Login successful' });
        return;
    }

    res.status(401).json({ status: false, message : 'Ivalid credentials' });

};

export const refreshToken = ( req: Request, res: Response)=>{
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(401).json({ message: 'Unautorized'});
    }

    try{
        const newToken = authService.refreshToken(refreshToken);
        res.cookie('token', newToken, { httpOnly: true, secure: true, sameSite: 'strict'});
    } catch (error){
        return res.status(401).json({ message: 'Unautorized'});
    }
};