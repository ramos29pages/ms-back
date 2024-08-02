// src/controllers/resetPassword.controller.ts
import { Request, Response } from 'express';
import { errorMessages, successMessages } from '../config/config';
import UserResponse from '../models/response';
import ResetPasswordService from '../services/resetPassword.service';

export const sendCode = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const isValidEmail = await ResetPasswordService.emailValidator(email);
    if(isValidEmail && isValidEmail?.status == false){
      res.status(200).json(new UserResponse( false, errorMessages.errorEmailMessage));
    } else {
      ResetPasswordService.sendResetCode(email).then(
        ()=>{ res.status(200).json(new UserResponse( true, successMessages.codeSentMessage)); }
      );
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Internal Server Error please contact support' });
  }
};


export const validateCode = async (req: Request, res: Response) => {
  const { email, code } = req.body;
  try {
    const isValidResponse = await ResetPasswordService.codeValidator(email, code);
    console.log(isValidResponse);
    res.status(200).json(isValidResponse);
  } catch (error) {
    res.status(500).json({ status: false, message: 'Internal Server Error please contact support' });
  }
};
