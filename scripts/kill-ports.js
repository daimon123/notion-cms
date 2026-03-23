// dev 서작 전 사용 중인 포트를 정리하는 스크립트
const { execSync } = require('child_process');

const PORTS = [3000];

PORTS.forEach((port) => {
  try {
    const output = execSync('cmd /c netstat -ano').toString();
    const lines = output.split('\n');

    lines.forEach((line) => {
      if (line.includes(`:${port}`) && line.includes('LISTENING')) {
        const pid = line.trim().split(/\s+/).pop();
        if (pid && !isNaN(pid)) {
          try {
            execSync(`cmd /c taskkill /PID ${pid} /F`);
            console.log(`[kill-ports] 포트 ${port} 점유 프로세스(PID: ${pid}) 종료됨`);
          } catch (e) {
            // 이미 종료된 프로세스면 무시
          }
        }
      }
    });
  } catch (e) {
    // netstat 실행 실패 시 무시
  }
});
