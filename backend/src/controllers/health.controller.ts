import { Request, Response } from 'express';
import { sendSuccess } from '../utils/response';

// 서버 상태 확인
export function getHealth(_req: Request, res: Response): void {
  sendSuccess(res, {
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  }, '서버가 정상 동작 중입니다.');
}
