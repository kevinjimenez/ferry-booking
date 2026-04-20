<template>
  <div
    :class="twMerge('rounded-full size-10 bg-border flex items-center justify-center', props.class)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

const props = defineProps<{ class?: string }>();
</script>
