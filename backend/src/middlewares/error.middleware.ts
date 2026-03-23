import { Request, Response, NextFunction } from 'express';
import { ApiError, sendError } from '../utils/response';
import { logger } from '../utils/logger';

// 전역 에러 핸들러 미들웨어 (반드시 마지막에 등록)
export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  logger.error(`${req.method} ${req.path} - ${err.message}`, { stack: err.stack });

  if (err instanceof ApiError) {
    sendError(res, err.message, err.statusCode, err.errors);
    return;
  }

  // ZodError 처리
  if (err.name === 'ZodError') {
    sendError(res, '입력값 검증에 실패했습니다.', 422, err);
    return;
  }

  // 일반 에러
  const message =
    process.env.NODE_ENV === 'production' ? '서버 오류가 발생했습니다.' : err.message;

  sendError(res, message, 500);
}
