// 공통 API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

// 사용자 타입
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

// 인증 상태 타입
export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
}

// 로그인 요청 타입
export interface LoginRequest {
  email: string;
  password: string;
}

// 로그인 응답 타입
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// 토큰 갱신 응답 타입
export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

// 라우트 메타 타입
export interface RouteMeta {
  requiresAuth?: boolean;
  layout?: 'default' | 'auth';
  title?: string;
}

// 테이블 헤더 타입
export interface TableHeader {
  title: string;
  key: string;
  sortable?: boolean;
  width?: string | number;
  align?: 'start' | 'center' | 'end';
}

// 페이지네이션 타입
export interface Pagination {
  page: number;
  perPage: number;
  total: number;
}
