import jwt from "jsonwebtoken";
// import { jwtConfig } from "../config/jwt.config";


interface UserPayload {
  username: string;
}

export class AuthService {
  generateTokens(user: UserPayload) {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '10m' });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '1d' });
    return { accessToken, refreshToken };
  }

  verifyToken(token: string, secret: string) {
    return jwt.verify(token, secret);
  }

  refreshToken(token: string) {
    try {
      const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string) as UserPayload;
      return this.generateTokens({ username: user.username });
    } catch (error) {
      throw error;
    }
  }
}
