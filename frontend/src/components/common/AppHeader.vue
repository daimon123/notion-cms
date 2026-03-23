<template>
  <v-app-bar elevation="1" :color="uiStore.isDark ? 'surface' : 'white'">
    <!-- 사이드바 토글 버튼 -->
    <v-app-bar-nav-icon @click="uiStore.toggleSidebar" />

    <v-app-bar-title class="font-semibold text-lg">
      {{ title }}
    </v-app-bar-title>

    <template #append>
      <div class="flex items-center gap-2 mr-2">
        <!-- 다크모드 토글 -->
        <v-btn icon @click="toggleTheme">
          <v-icon>{{ uiStore.isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
          <v-tooltip activator="parent" location="bottom">
            {{ uiStore.isDark ? '라이트 모드' : '다크 모드' }}
          </v-tooltip>
        </v-btn>

        <!-- 알림 -->
        <v-btn icon>
          <v-badge content="3" color="error">
            <v-icon>mdi-bell-outline</v-icon>
          </v-badge>
          <v-tooltip activator="parent" location="bottom">알림</v-tooltip>
        </v-btn>

        <!-- 사용자 메뉴 -->
        <v-menu>
          <template #activator="{ props }">
            <v-btn icon v-bind="props">
              <v-avatar size="32" color="primary">
                <span class="text-sm font-bold text-white">
                  {{ userInitial }}
                </span>
              </v-avatar>
            </v-btn>
          </template>

          <v-list min-width="200">
            <v-list-item :title="authStore.user?.name" :subtitle="authStore.user?.email">
              <template #prepend>
                <v-avatar color="primary">
                  <span class="text-white font-bold">{{ userInitial }}</span>
                </v-avatar>
              </template>
            </v-list-item>

            <v-divider class="my-1" />

            <v-list-item prepend-icon="mdi-account-outline" title="프로필" />
            <v-list-item prepend-icon="mdi-cog-outline" title="설정" />

            <v-divider class="my-1" />

            <v-list-item
              prepend-icon="mdi-logout"
              title="로그아웃"
              class="text-error"
              @click="handleLogout"
            />
          </v-list>
        </v-menu>
      </div>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from 'vuetify';
import { useAuthStore } from '@/stores/auth';
import { useUiStore } from '@/stores/ui';

const props = defineProps<{
  title?: string;
}>();

const title = computed(() => props.title || import.meta.env.VITE_APP_TITLE || 'My Starter Kit');

const authStore = useAuthStore();
const uiStore = useUiStore();
const theme = useTheme();

// 사용자 이니셜
const userInitial = computed(() => {
  return authStore.user?.name?.charAt(0)?.toUpperCase() || 'U';
});

// 다크모드 토글
function toggleTheme() {
  uiStore.toggleDark();
  theme.global.name.value = uiStore.isDark ? 'dark' : 'light';
}

// 로그아웃
async function handleLogout() {
  await authStore.logout();
}
</script>
