<template>
  <v-app :theme="uiStore.isDark ? 'dark' : 'light'">
    <!-- 사이드바 -->
    <AppSidebar />

    <!-- 상단 헤더 -->
    <AppHeader :title="pageTitle" />

    <!-- 메인 콘텐츠 -->
    <v-main>
      <div class="p-6">
        <!-- 브레드크럼 -->
        <AppBreadcrumb class="mb-4" />

        <!-- 라우터 뷰 (전환 애니메이션 포함) -->
        <router-view v-slot="{ Component, route }">
          <transition name="page" mode="out-in">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUiStore } from '@/stores/ui';
import AppSidebar from '@/components/common/AppSidebar.vue';
import AppHeader from '@/components/common/AppHeader.vue';
import AppBreadcrumb from '@/components/common/AppBreadcrumb.vue';

const uiStore = useUiStore();
const route = useRoute();

// 현재 페이지 타이틀
const pageTitle = computed(() => (route.meta?.title as string) || '');
</script>

<style scoped>
/* 페이지 전환 애니메이션 */
.page-enter-active,
.page-leave-active {
  transition: all 0.2s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
