/// <reference path="../models/types/express.d.ts" />
import { Request, Response} from 'express';
import UserService from '../services/user.service';
const userService = new UserService();

export const getAllUsers = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Content protected', user: req.user});
}

export const validateUsername = async (req: Request, res: Response) => {
    const { username } = req.body;

    if(username){
        const valid = await userService.validateUsername(username);
        if(valid){
            res.status(200).json({ status: true, message : 'username is valid' });
        } else{
            res.status(401).json({ status: false, message : 'Invalid username.' });
        }
    } else{
        res.status(401).json({ status: false, message : 'You must provide a username.' });
    }
};

