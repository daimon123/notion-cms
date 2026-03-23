import app from './app';
import { config } from './config';
import { logger } from './utils/logger';

const PORT = config.port;

// 서버 시작
app.listen(PORT, () => {
  logger.info(`🚀 서버 시작: http://localhost:${PORT}`);
  logger.info(`📋 환경: ${config.env}`);
  logger.info(`🔗 API: http://localhost:${PORT}/api/v1`);
  logger.info(`❤️  헬스체크: http://localhost:${PORT}/api/v1/health`);
});

// 예상치 못한 오류 처리
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});
