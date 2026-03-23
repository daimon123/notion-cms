<template>
  <v-breadcrumbs :items="breadcrumbItems" divider="mdi-chevron-right" class="px-0 py-1">
    <template #item="{ item }">
      <v-breadcrumbs-item
        :to="item.to"
        :disabled="item.disabled"
        :title="item.title"
        class="text-sm"
      />
    </template>
  </v-breadcrumbs>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// 라우트 기반 자동 브레드크럼 생성
const breadcrumbItems = computed(() => {
  const items = [{ title: '홈', to: '/', disabled: false }];

  const matched = route.matched.filter((r) => r.meta?.title);

  matched.forEach((r, index) => {
    items.push({
      title: (r.meta?.title as string) || '',
      to: r.path,
      disabled: index === matched.length - 1,
    });
  });

  return items;
});
</script>
