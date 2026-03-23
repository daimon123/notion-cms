<template>
  <v-app theme="light">
    <v-main class="bg-gray-50">
      <div class="min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-md">
          <!-- 로고/타이틀 -->
          <div class="text-center mb-8">
            <v-icon color="primary" size="48" class="mb-3">mdi-rocket-launch</v-icon>
            <h1 class="text-2xl font-bold text-gray-900">My Starter Kit</h1>
            <p class="text-gray-500 mt-1 text-sm">Vue.js + Node.js 풀스택 스타터킷</p>
          </div>

          <!-- 콘텐츠 카드 -->
          <v-card elevation="2" rounded="xl">
            <v-card-text class="p-8">
              <router-view />
            </v-card-text>
          </v-card>
        </div>
      </div>
    </v-main>
  </v-app>
</template>
