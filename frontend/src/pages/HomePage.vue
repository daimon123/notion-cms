<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        안녕하세요, {{ authStore.user?.name }}님! 👋
      </h1>
      <p class="text-gray-500 mt-1">오늘도 좋은 하루 되세요.</p>
    </div>

    <!-- 빠른 링크 카드 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <v-card
        v-for="card in quickLinks"
        :key="card.title"
        :to="card.to"
        hover
        class="cursor-pointer transition-transform hover:-translate-y-0.5"
      >
        <v-card-text class="p-5">
          <div class="flex items-center gap-4">
            <div :class="`p-3 rounded-xl bg-${card.color}-50`">
              <v-icon :color="card.color" size="28">{{ card.icon }}</v-icon>
            </div>
            <div>
              <p class="font-semibold text-gray-800">{{ card.title }}</p>
              <p class="text-sm text-gray-500 mt-0.5">{{ card.description }}</p>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const quickLinks = [
  {
    title: '대시보드',
    description: '주요 지표 및 현황 확인',
    icon: 'mdi-view-dashboard-outline',
    color: 'primary',
    to: '/dashboard',
  },
  {
    title: '사용자 관리',
    description: '사용자 계정 관리',
    icon: 'mdi-account-group-outline',
    color: 'green',
    to: '/users',
  },
  {
    title: '설정',
    description: '시스템 설정 변경',
    icon: 'mdi-cog-outline',
    color: 'orange',
    to: '/settings',
  },
];
</script>
