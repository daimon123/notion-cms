import { defineStore } from 'pinia';
import { authApi } from '@/api/auth';
import type { User, LoginRequest } from '@/types';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    refreshTokenValue: null as string | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin',
  },

  actions: {
    // 로그인
    async login(credentials: LoginRequest) {
      const { data } = await authApi.login(credentials);
      this.token = data.data.accessToken;
      this.refreshTokenValue = data.data.refreshToken;
      this.user = data.data.user;
    },

    // 토큰 갱신
    async refreshToken(): Promise<string> {
      if (!this.refreshTokenValue) {
        throw new Error('리프레시 토큰이 없습니다.');
      }

      const { data } = await authApi.refresh(this.refreshTokenValue);
      this.token = data.data.accessToken;
      this.refreshTokenValue = data.data.refreshToken;
      return this.token;
    },

    // 로그아웃
    async logout() {
      try {
        await authApi.logout();
      } catch {
        // 로그아웃 API 실패해도 로컬 상태는 초기화
      } finally {
        this.user = null;
        this.token = null;
        this.refreshTokenValue = null;
        router.push('/login');
      }
    },

    // 사용자 정보 갱신
    async fetchMe() {
      const { data } = await authApi.getMe();
      this.user = data.data;
    },
  },

  persist: {
    // 토큰만 localStorage에 영속화
    pick: ['token', 'refreshTokenValue'],
  },
});
