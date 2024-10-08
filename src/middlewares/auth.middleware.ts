/// <reference path="../models/types/express.d.ts" />
import { Request, Response, NextFunction} from 'express';
import { jwtConfig } from '../config/jwt.config';
import jwt from 'jsonwebtoken';
  
export const authenticateToken = (req: Request, res: Response, next: NextFunction) =>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({ status: false,  message: 'Unauthorized'});
    }

    try{
        const decoded = jwt.verify(token, jwtConfig.secretKey);
        req.user = decoded;
        next();

    }catch(error){
        return res.status(401).json({ status: false, message: 'Unauthorized' });
    }
};
