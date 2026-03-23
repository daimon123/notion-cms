import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { sendSuccess } from '../utils/response';

const router = Router();

// GET /api/v1/users/me - 현재 사용자 정보
router.get('/me', authMiddleware, (req, res) => {
  sendSuccess(res, req.user, '사용자 정보를 가져왔습니다.');
});

export default router;
