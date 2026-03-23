<template>
  <v-app theme="light">
    <v-main>
      <div class="min-h-screen flex items-center justify-center p-4">
        <div class="text-center">
          <div
            v-motion
            :initial="{ opacity: 0, y: -20 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          >
            <v-icon color="primary" size="80" class="mb-4">mdi-compass-off-outline</v-icon>
            <h1 class="text-6xl font-black text-gray-200 mb-2">404</h1>
            <h2 class="text-xl font-bold text-gray-700 mb-2">페이지를 찾을 수 없습니다</h2>
            <p class="text-gray-500 mb-8 text-sm max-w-sm mx-auto">
              요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            </p>

            <div class="flex gap-3 justify-center">
              <v-btn color="primary" :to="{ name: 'dashboard' }">
                <v-icon start>mdi-home</v-icon>
                홈으로 이동
              </v-btn>
              <v-btn variant="outlined" @click="router.back()">
                <v-icon start>mdi-arrow-left</v-icon>
                이전 페이지
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
