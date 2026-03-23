// 스타일 로드 순서 핵심:
// 1. Vuetify 스타일 먼저 (vuetify.ts에서 import)
// 2. Tailwind + 전역 스타일 나중 (우선순위 높음)
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { MotionPlugin } from '@vueuse/motion';
import App from './App.vue';
import router from './router';
import { vuetify } from './vuetify';

// Vuetify 오버라이드 + Tailwind CSS (순서 중요)
import './assets/styles/vuetify-override.css';
import './assets/styles/main.css';

const app = createApp(App);

// Pinia 상태 관리 + 영속성 플러그인
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(MotionPlugin);

app.mount('#app');
