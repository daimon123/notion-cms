<template>
  <div>
    <!-- 검색 및 필터 영역 -->
    <div v-if="searchable" class="flex items-center gap-3 mb-4">
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        placeholder="검색..."
        clearable
        hide-details
        density="compact"
        class="max-w-sm"
      />
      <slot name="actions" />
    </div>

    <!-- 데이터 테이블 -->
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      :search="search"
      :items-per-page="itemsPerPage"
      class="elevation-0 border border-gray-100 rounded-xl"
      v-bind="$attrs"
    >
      <!-- 슬롯 위임 -->
      <template v-for="(_, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}" />
      </template>

      <!-- 로딩 상태 -->
      <template #loading>
        <v-skeleton-loader type="table-row@5" />
      </template>

      <!-- 데이터 없을 때 -->
      <template #no-data>
        <div class="flex flex-col items-center py-12 text-gray-400">
          <v-icon size="48" class="mb-3">mdi-database-off-outline</v-icon>
          <p class="text-sm">데이터가 없습니다.</p>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TableHeader } from '@/types';

defineProps<{
  headers: TableHeader[];
  items: unknown[];
  loading?: boolean;
  searchable?: boolean;
  itemsPerPage?: number;
}>();

const search = ref('');
</script>
