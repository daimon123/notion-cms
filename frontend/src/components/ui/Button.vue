<template>
  <v-btn
    v-bind="$attrs"
    :class="cn('transition-all', variantClass, sizeClass, props.class)"
    :loading="loading"
    :disabled="disabled || loading"
  >
    <slot />
  </v-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'link';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    disabled?: boolean;
    class?: string;
  }>(),
  {
    variant: 'default',
    size: 'md',
    loading: false,
    disabled: false,
  },
);

const variantClass = computed(() => {
  const variants = {
    default: '',
    outline: 'border border-gray-300',
    ghost: 'bg-transparent shadow-none hover:bg-gray-100',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
    link: 'bg-transparent shadow-none underline',
  };
  return variants[props.variant];
});

const sizeClass = computed(() => {
  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };
  return sizes[props.size];
});
</script>
