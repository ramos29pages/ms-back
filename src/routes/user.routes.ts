import { Router } from 'express';
import { getAllUsers } from '../controllers/user.controller';
import { sendCode, validateCode } from './../controllers/resetPassword.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.get('/protected', authenticateToken, getAllUsers);
router.post('/reset-password/send-code', sendCode);
router.post('/reset-password/validate-code', validateCode);

export default router;
