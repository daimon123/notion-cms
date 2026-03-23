import { hashPassword, comparePassword } from '../utils/password';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { ApiError } from '../utils/response';

// 임시 인메모리 사용자 저장소 (실제 프로젝트에서는 DB로 교체)
interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
}

const users: User[] = [];

// 초기 관리자 계정 생성 (개발용)
async function initAdminUser() {
  const hashedPassword = await hashPassword('admin1234!');
  users.push({
    id: '1',
    email: 'admin@example.com',
    password: hashedPassword,
    name: '관리자',
    role: 'admin',
  });
}

initAdminUser();

export class AuthService {
  // 로그인
  async login(email: string, password: string) {
    const user = users.find((u) => u.email === email);

    if (!user) {
      throw new ApiError(401, '이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, '이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    const payload = { userId: user.id, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  // 토큰 갱신
  async refreshToken(token: string) {
    try {
      const payload = verifyRefreshToken(token);
      const user = users.find((u) => u.id === payload.userId);

      if (!user) {
        throw new ApiError(401, '유효하지 않은 사용자입니다.');
      }

      const newPayload = { userId: user.id, email: user.email };
      const accessToken = generateAccessToken(newPayload);
      const refreshToken = generateRefreshToken(newPayload);

      return { accessToken, refreshToken };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(401, '유효하지 않거나 만료된 리프레시 토큰입니다.');
    }
  }

  // 사용자 조회
  async getUserById(userId: string) {
    const user = users.find((u) => u.id === userId);
    if (!user) {
      throw new ApiError(404, '사용자를 찾을 수 없습니다.');
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
}

export const authService = new AuthService();
