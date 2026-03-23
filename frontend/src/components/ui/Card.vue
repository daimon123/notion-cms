<template>
  <v-card
    v-bind="$attrs"
    :class="cn('overflow-hidden', props.class)"
  >
    <div v-if="title || $slots.header" class="px-6 pt-5 pb-2">
      <slot name="header">
        <h3 class="text-base font-semibold text-gray-800 dark:text-gray-100">{{ title }}</h3>
        <p v-if="description" class="text-sm text-gray-500 mt-0.5">{{ description }}</p>
      </slot>
    </div>

    <v-card-text :class="cn('px-6', !title && !$slots.header ? 'pt-5' : 'pt-2')">
      <slot />
    </v-card-text>

    <div v-if="$slots.footer" class="px-6 pb-5 pt-2 border-t border-gray-100">
      <slot name="footer" />
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

defineProps<{
  title?: string;
  description?: string;
  class?: string;
}>();
</script>
