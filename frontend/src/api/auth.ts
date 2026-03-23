import api from './index';
import type { LoginRequest, LoginResponse, RefreshResponse, User, ApiResponse } from '@/types';

// 인증 API 모듈
export const authApi = {
  // 로그인
  login(data: LoginRequest) {
    return api.post<ApiResponse<LoginResponse>>('/auth/login', data);
  },

  // 토큰 갱신
  refresh(refreshToken: string) {
    return api.post<ApiResponse<RefreshResponse>>('/auth/refresh', { refreshToken });
  },

  // 로그아웃
  logout() {
    return api.post<ApiResponse<null>>('/auth/logout');
  },

  // 내 정보 조회
  getMe() {
    return api.get<ApiResponse<User>>('/auth/me');
  },
};
