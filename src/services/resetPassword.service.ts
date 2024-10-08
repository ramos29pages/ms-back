// src/services/resetPassword.service.ts
import { pool } from "../config/db.config";
import UserRepository  from "../repositories/user.repository";
import Code from "../models/code"
import CodeRepository from "../repositories/codes.repository";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { nodemailerConfig } from "../config/config";
// import { stringify } from "querystring";

// pass: 'hhin ncrb vlir ugcd'
class ResetPasswordService {

  userRepository : UserRepository = new UserRepository();
  codeRepository: CodeRepository = new CodeRepository();

  async sendResetCode(email: string) {

    // Generar un código aleatorio de 6 dígitos
    const resetCode = crypto.randomInt(100000, 999999).toString();

    // Configurar el servicio de correo
    const transporter = nodemailer.createTransport({
      service: nodemailerConfig.service, // Puedes usar cualquier otro servicio de correo
      auth: {
        user: nodemailerConfig.email,
        pass: nodemailerConfig.password,
      },
    });

    // Configura el correo electrónico
    const mailOptions = {
      from: nodemailerConfig.email,
      to: email,
      subject: "Reset Password Code",
      html: `<h1>Your reset code is ${resetCode}</h1> Use this code to restore your password.</p>`,
    };

    // Enviar el correo electrónico
    try {
      console.log(email);
      let tr = await transporter.sendMail(mailOptions);
      console.log(tr.response.includes("OK"));
      if(tr.response.includes("OK")) {
        let saveResponse = await this.saveResetCode(email, resetCode);
        if(saveResponse.status) return { status: true, message: "Code sent" };
      }
    } catch (error) {
      console.log(error);
      return { status: true, message: error };
    }
  }

  async emailValidator(email: string) {

    console.log('EMAIL-VALIDATOR');

    try {
      const isValid = await this.userRepository.findByEmail(email);
      console.log('EMAIL-VALIDATOR-valid__', isValid);
      if (!isValid) {
        console.log('EMAIL-VALIDATOR-SUCCESS::', isValid);
      return { status: false, message: "Email no exists." };
      } else {
        return { status: true, message: "Email found" };
      }
    }catch (error) {
      console.error('EMAIL-VALIDATOR-ERROR::',error);
      return { status: false, message: "Error validating email." };
    }
  }

  async codeValidator(email: string, code: string) {
    try {
      const res = await this.codeRepository.findCodeByEmailAndCode(email, code) as Code;

      if (!res) {
        return { status: false, message: "The code does not exist." };
      }

      const currentTime = new Date();
      const expirationTime = new Date(res.expiration); // resetCode.expiration

      if (currentTime > expirationTime) {
        return { status: false, message: "Code expired" };
      }

      if (res.status) { // reset code.used
        return { status: false, message: "Code already used" };
      }

      await this.codeRepository.updateCodeByEmailAndCode(email, code);
      return { status: true, message: "Valid code" };
    } catch (error) {
      console.error(error);
      return { status: false, message: "Error validating code" };
    }
  }

  // Función para guardar el código de restablecimiento
  async saveResetCode(email : string, resetCode: string) {
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 5); // Establecer la expiración para 5 minutos después

    const insertQuery =
      "INSERT INTO reset_codes (email, code, created, expiration, status) VALUES (?, ?, NOW(), ?, false)";
    try {
      await pool.query(insertQuery, [email, resetCode, expirationDate]);
      return { status: true, message: "Code saved" };
    } catch (error) {
      console.error(error);
      return { status: false, message: "Error saving code" };
    }
  }
}

export default new ResetPasswordService();
