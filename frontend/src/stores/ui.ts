import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    // 다크모드
    isDark: false,
    // 사이드바 열림 상태
    isSidebarOpen: true,
    // 전역 로딩 상태
    isLoading: false,
    // 사이드바 미니 모드
    isMini: false,
  }),

  actions: {
    toggleDark() {
      this.isDark = !this.isDark;
    },

    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },

    toggleMini() {
      this.isMini = !this.isMini;
    },

    setLoading(value: boolean) {
      this.isLoading = value;
    },
  },

  persist: {
    pick: ['isDark', 'isMini'],
  },
});
