import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.config';

export class AuthService {

    generateTokens(payload: object) {
        const token = jwt.sign(payload, jwtConfig.secretKey, { expiresIn: jwtConfig.accesTokenExpiresIn });
        const refreshToken = jwt.sign(payload, jwtConfig.refreshSecretkey, { expiresIn: jwtConfig.refreshTokenExpiresIn });
        return { token, refreshToken };
    }

    refreshToken(refreshToken: string) {
        const decoded = jwt.verify(refreshToken, jwtConfig.refreshSecretkey) as { username: string };
        return jwt.sign({ username: decoded.username }, jwtConfig.secretKey, { expiresIn: jwtConfig.accesTokenExpiresIn });
    }
}
