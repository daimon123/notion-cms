<template>
  <v-navigation-drawer
    v-model="uiStore.isSidebarOpen"
    :rail="uiStore.isMini"
    :color="uiStore.isDark ? 'surface' : 'white'"
    permanent
  >
    <!-- 로고 영역 -->
    <div class="flex items-center h-16 px-4">
      <v-icon color="primary" size="32">mdi-rocket-launch</v-icon>
      <transition name="fade">
        <span v-if="!uiStore.isMini" class="ml-3 text-lg font-bold text-primary-700">
          Starter Kit
        </span>
      </transition>
    </div>

    <v-divider />

    <!-- 네비게이션 메뉴 -->
    <v-list nav density="compact" class="mt-2">
      <v-list-item
        v-for="item in menuItems"
        :key="item.name"
        :to="item.to"
        :prepend-icon="item.icon"
        :title="item.title"
        rounded="lg"
        active-class="bg-primary text-white"
      >
        <v-tooltip v-if="uiStore.isMini" activator="parent" location="end">
          {{ item.title }}
        </v-tooltip>
      </v-list-item>
    </v-list>

    <!-- 하단 미니 토글 버튼 -->
    <template #append>
      <v-divider />
      <div class="p-2">
        <v-btn
          block
          variant="text"
          :icon="uiStore.isMini"
          @click="uiStore.toggleMini"
        >
          <v-icon>{{ uiStore.isMini ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
          <span v-if="!uiStore.isMini" class="ml-2">접기</span>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useUiStore } from '@/stores/ui';

const uiStore = useUiStore();

// 사이드바 메뉴 항목
const menuItems = [
  { name: 'home', to: '/', icon: 'mdi-home-outline', title: '홈' },
  { name: 'dashboard', to: '/dashboard', icon: 'mdi-view-dashboard-outline', title: '대시보드' },
  { name: 'users', to: '/users', icon: 'mdi-account-group-outline', title: '사용자 관리' },
  { name: 'settings', to: '/settings', icon: 'mdi-cog-outline', title: '설정' },
];
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
