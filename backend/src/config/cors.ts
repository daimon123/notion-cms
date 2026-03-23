import { CorsOptions } from 'cors';
import { config } from './index';

// CORS 설정
export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // 허용된 오리진 목록
    const allowedOrigins = config.cors.origin.split(',').map((o) => o.trim());

    // 오리진이 없는 경우 (같은 도메인 요청, Postman 등)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS 정책 위반: ${origin}은 허용되지 않은 오리진입니다.`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
