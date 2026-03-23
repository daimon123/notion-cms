import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

// Zod 스키마 기반 요청 검증 미들웨어
export function validate(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      req.body = result.data;
      next({ name: 'ZodError', message: '입력값이 올바르지 않습니다.', errors });
      return;
    }

    req.body = result.data;
    next();
  };
}
