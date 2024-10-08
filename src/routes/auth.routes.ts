import express from 'express';
import { AuthController } from '../controllers/auth.controller'
import { validateUsername } from '../controllers/user.controller';


const router = express.Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh-token', authController.refreshTokenHandler);
router.post('/protected-route', authController.protectedRoute);
router.get('/validate-auth', authController.isAutenticated);
router.post('/validate-username', validateUsername);


export default router;

