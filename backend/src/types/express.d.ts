// Express Request 타입 확장 - 인증 사용자 정보 포함
declare namespace Express {
  interface Request {
    user?: {
      userId: string;
      email: string;
    };
  }
}
