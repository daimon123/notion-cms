import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { authService } from '../services/auth.service';
import { sendSuccess } from '../utils/response';

// 로그인 스키마
export const loginSchema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
});

// 토큰 갱신 스키마
export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, '리프레시 토큰이 필요합니다.'),
});

// 로그인
export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    sendSuccess(res, result, '로그인에 성공했습니다.');
  } catch (error) {
    next(error);
  }
}

// 토큰 갱신
export async function refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refreshToken(refreshToken);
    sendSuccess(res, result, '토큰이 갱신되었습니다.');
  } catch (error) {
    next(error);
  }
}

// 로그아웃 (클라이언트에서 토큰 삭제)
export function logout(_req: Request, res: Response): void {
  sendSuccess(res, null, '로그아웃되었습니다.');
}

// 내 정보 조회
export async function getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await authService.getUserById(req.user!.userId);
    sendSuccess(res, user, '사용자 정보를 가져왔습니다.');
  } catch (error) {
    next(error);
  }
}
