import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import type { RouteMeta } from '@/types';

// 라우트 정의
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 인증 레이아웃 라우트
    {
      path: '/login',
      component: () => import('@/layouts/AuthLayout.vue'),
      meta: { layout: 'auth', title: '로그인' } as RouteMeta,
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('@/pages/auth/LoginPage.vue'),
        },
      ],
    },
    // 기본 레이아웃 라우트 (인증 필요)
    {
      path: '/',
      component: () => import('@/layouts/DefaultLayout.vue'),
      meta: { requiresAuth: true } as RouteMeta,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/pages/HomePage.vue'),
          meta: { title: '홈' } as RouteMeta,
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/pages/dashboard/DashboardPage.vue'),
          meta: { title: '대시보드' } as RouteMeta,
        },
      ],
    },
    // 404 페이지
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/error/NotFoundPage.vue'),
      meta: { title: '페이지를 찾을 수 없습니다' } as RouteMeta,
    },
  ],
});

// 네비게이션 가드
router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore();

  // 페이지 타이틀 설정
  if (to.meta?.title) {
    document.title = `${to.meta.title} | My Starter Kit`;
  }

  const requiresAuth = to.matched.some((record) => record.meta?.requiresAuth);

  if (requiresAuth && !authStore.isAuthenticated) {
    // 인증 필요한 페이지에 미인증 접근
    next({ name: 'login', query: { redirect: to.fullPath } });
  } else if (to.name === 'login' && authStore.isAuthenticated) {
    // 이미 로그인 상태에서 로그인 페이지 접근
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router;
