<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">대시보드</h1>

    <!-- 통계 카드 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <v-card
        v-for="stat in stats"
        :key="stat.title"
        elevation="1"
      >
        <v-card-text class="p-5">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm text-gray-500 font-medium">{{ stat.title }}</p>
              <p class="text-2xl font-bold mt-1">{{ stat.value }}</p>
              <div class="flex items-center gap-1 mt-2">
                <v-icon
                  :color="stat.changeType === 'up' ? 'success' : 'error'"
                  size="14"
                >
                  {{ stat.changeType === 'up' ? 'mdi-trending-up' : 'mdi-trending-down' }}
                </v-icon>
                <span
                  :class="stat.changeType === 'up' ? 'text-green-600' : 'text-red-600'"
                  class="text-xs font-medium"
                >
                  {{ stat.change }}
                </span>
                <span class="text-xs text-gray-400">지난달 대비</span>
              </div>
            </div>
            <div :class="`p-3 rounded-xl bg-${stat.color}-50`">
              <v-icon :color="stat.color" size="24">{{ stat.icon }}</v-icon>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>

    <!-- 데이터 테이블 -->
    <v-card elevation="1">
      <v-card-title class="px-6 pt-5 pb-2 text-base font-semibold">
        최근 사용자 목록
      </v-card-title>
      <v-card-text class="px-6">
        <DataTable
          :headers="tableHeaders"
          :items="tableItems"
          :loading="false"
          searchable
          :items-per-page="5"
        >
          <!-- 상태 컬럼 커스터마이징 -->
          <template #item.status="{ item }">
            <v-chip
              :color="item.status === '활성' ? 'success' : 'default'"
              size="small"
              variant="tonal"
            >
              {{ item.status }}
            </v-chip>
          </template>

          <!-- 역할 컬럼 커스터마이징 -->
          <template #item.role="{ item }">
            <v-chip
              :color="item.role === 'admin' ? 'primary' : 'default'"
              size="small"
              variant="outlined"
            >
              {{ item.role }}
            </v-chip>
          </template>
        </DataTable>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import DataTable from '@/components/ui/DataTable.vue';
import type { TableHeader } from '@/types';

// 통계 카드 데이터
const stats = [
  {
    title: '총 사용자',
    value: '1,234',
    change: '+12%',
    changeType: 'up',
    icon: 'mdi-account-multiple-outline',
    color: 'primary',
  },
  {
    title: '오늘 방문자',
    value: '89',
    change: '+5%',
    changeType: 'up',
    icon: 'mdi-eye-outline',
    color: 'green',
  },
  {
    title: '신규 가입',
    value: '23',
    change: '-3%',
    changeType: 'down',
    icon: 'mdi-account-plus-outline',
    color: 'orange',
  },
  {
    title: '활성 세션',
    value: '456',
    change: '+8%',
    changeType: 'up',
    icon: 'mdi-lightning-bolt-outline',
    color: 'purple',
  },
];

// 테이블 헤더
const tableHeaders: TableHeader[] = [
  { title: '이름', key: 'name', sortable: true },
  { title: '이메일', key: 'email', sortable: true },
  { title: '역할', key: 'role', sortable: true },
  { title: '상태', key: 'status', sortable: true },
  { title: '가입일', key: 'joinedAt', sortable: true },
];

// 샘플 테이블 데이터
const tableItems = [
  { name: '김관리자', email: 'admin@example.com', role: 'admin', status: '활성', joinedAt: '2024-01-01' },
  { name: '이사용자', email: 'user1@example.com', role: 'user', status: '활성', joinedAt: '2024-02-15' },
  { name: '박테스터', email: 'test@example.com', role: 'user', status: '비활성', joinedAt: '2024-03-20' },
  { name: '최개발자', email: 'dev@example.com', role: 'user', status: '활성', joinedAt: '2024-04-10' },
  { name: '정디자이너', email: 'design@example.com', role: 'user', status: '활성', joinedAt: '2024-05-05' },
];
</script>
