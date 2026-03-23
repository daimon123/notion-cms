import { Router } from 'express';
import {
  login,
  logout,
  refreshToken,
  getMe,
  loginSchema,
  refreshTokenSchema,
} from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';
import { authLimiter } from '../middlewares/rateLimit.middleware';

const router = Router();

// POST /api/v1/auth/login - 로그인
router.post('/login', authLimiter, validate(loginSchema), login);

// POST /api/v1/auth/refresh - 토큰 갱신
router.post('/refresh', validate(refreshTokenSchema), refreshToken);

// POST /api/v1/auth/logout - 로그아웃
router.post('/logout', authMiddleware, logout);

// GET /api/v1/auth/me - 내 정보 조회
router.get('/me', authMiddleware, getMe);

export default router;
