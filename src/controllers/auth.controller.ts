import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import UserService from "../services/user.service";
// import { TokenExpiredError } from 'jsonwebtoken';
const userService = new UserService();
const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({
          status: false,
          message: "Username and password are required.",
        });
    }

    const valid = await userService.validateLogin(username, password);

    if (valid.status) {
      const { accessToken, refreshToken: newRefreshToken } =
        authService.generateTokens({ username });

      res.cookie("token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
      });
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
      });

      return res
        .status(200)
        .json({ status: true, message: "Login successful." });
    } else {
      return res
        .status(401)
        .json({ status: false, message: "Invalid credentials." });
    }
  }

  refreshTokenHandler(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res
        .status(401)
        .json({
          status: false,
          message: "Unauthorized. No refresh token provided.",
        });
    }

    try {
      const { accessToken, refreshToken: newRefreshToken } =
        authService.refreshToken(refreshToken);

      res.cookie("token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
      });
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
      });

      return res
        .status(200)
        .json({ status: true, message: "Token was updated successfully." });
    } catch (error) {
      res.clearCookie("refreshToken");
      return res
        .status(401)
        .json({ status: false, message: "Invalid or expired refresh token." });
    }
  }

  logout(_req: Request, res: Response) {
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    return res
      .status(200)
      .json({ status: true, message: "Logged out successfully." });
  }

  protectedRoute(req: Request, res: Response) {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: "Unauthorized. No token provided." });
    }

    try {
      const user = authService.verifyToken(
        token,
        process.env.ACCESS_TOKEN_SECRET as string
      );
      return res
        .status(200)
        .json({ status: true, message: "Access granted.", user });
    } catch (error) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid or expired token." });
    }
  }

  isAutenticated(req: Request, res: Response){
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ authenticated: false });
    }

    try {
      const user = authService.verifyToken(
        token,
        process.env.ACCESS_TOKEN_SECRET as string
      );
      return user && res
        .status(200)
        .json({ authenticated: true });
    } catch (error) {
      return res
        .status(401)
        .json({ authenticated: false });
    }
  }
}
