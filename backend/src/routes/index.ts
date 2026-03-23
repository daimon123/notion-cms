import { Router } from 'express';
import healthRoutes from './health.routes';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import { apiLimiter } from '../middlewares/rateLimit.middleware';

const router = Router();

// API 요청 제한 적용
router.use(apiLimiter);

// 라우트 등록
router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
