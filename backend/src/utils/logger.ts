import winston from 'winston';
import { config } from '../config';

// 로그 포맷 정의
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.colorize({ all: config.env === 'development' }),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    return stack
      ? `[${timestamp}] ${level}: ${message}\n${stack}`
      : `[${timestamp}] ${level}: ${message}`;
  }),
);

// Winston 로거 인스턴스
export const logger = winston.createLogger({
  level: config.log.level,
  format: logFormat,
  transports: [
    new winston.transports.Console(),
    // 프로덕션 환경에서는 파일 로깅 추가 가능
    ...(config.env === 'production'
      ? [
          new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
          new winston.transports.File({ filename: 'logs/combined.log' }),
        ]
      : []),
  ],
});
