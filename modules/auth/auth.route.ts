import express from 'express';
import { register, login, refreshToken, getProfile, updateProfile, logout } from './auth.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = express.Router();

// Public routes
router.post('/register', register as any);
router.post('/login', login as any);
router.post('/refresh-token', refreshToken as any);

// Protected routes
router.use(authenticate as any);
router.get('/profile', getProfile as any);
router.put('/profile', updateProfile as any);
router.post('/logout', logout as any);

export default router;