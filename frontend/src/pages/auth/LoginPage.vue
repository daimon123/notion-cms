<template>
  <div>
    <h2 class="text-xl font-semibold text-gray-800 mb-1">로그인</h2>
    <p class="text-sm text-gray-500 mb-6">계정에 로그인하여 시작하세요</p>

    <LoginForm />

    <!-- 개발 환경 힌트 -->
    <div v-if="isDev" class="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-blue-600">
      <strong>개발 계정:</strong> admin@example.com / admin1234!
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/components/forms/LoginForm.vue';

const isDev = import.meta.env.DEV;
</script>
