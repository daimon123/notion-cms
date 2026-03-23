import { Response } from 'express';

// 표준 API 응답 형식
interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  timestamp: string;
}

interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: unknown;
}

// 성공 응답 전송
export function sendSuccess<T>(
  res: Response,
  data: T,
  message = '성공',
  statusCode = 200,
): void {
  const response: ApiSuccessResponse<T> = {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
  res.status(statusCode).json(response);
}

// 에러 응답 전송
export function sendError(
  res: Response,
  message: string,
  statusCode = 500,
  errors?: unknown,
): void {
  const response: ApiErrorResponse = {
    success: false,
    message,
  };
  if (errors !== undefined) {
    response.errors = errors;
  }
  res.status(statusCode).json(response);
}

// 커스텀 API 에러 클래스
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public errors?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
    Error.captureStackTrace(this, this.constructor);
  }
}
