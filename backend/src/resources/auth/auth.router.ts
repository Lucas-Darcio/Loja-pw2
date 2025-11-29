
import { Router } from 'express';
import authController from './auth.controller';

const router = Router();

router.post('/signup', authController.createClient);
router.post('/login', authController.checkAuth);
router.delete('/logout', authController.logout);
export default router;