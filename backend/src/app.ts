import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import { corsOptions } from './config/cors';
import routes from './routes';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

// 보안 헤더 설정
app.use(helmet());

// CORS 설정
app.use(cors(corsOptions));

// 응답 압축
app.use(compression());

// JSON 파서
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 요청 로깅
app.use(morgan('dev'));

// API 라우트
app.use('/api/v1', routes);

// 404 핸들러
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: '요청한 리소스를 찾을 수 없습니다.',
  });
});

// 전역 에러 핸들러 (반드시 마지막에 등록)
app.use(errorMiddleware);

export default app;
