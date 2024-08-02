/// <reference path="../models/types/express.d.ts" />
import { Request, Response} from 'express';

export const getProtectedContent = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Content protected', user: req.user});
}