<template>
  <div class="flex items-center gap-1.5">
    <component
      v-if="prefixIcon"
      :is="prefixIcon"
      :class="twMerge('size-5 text-gray-400', iconClass)"
    />
    <slot>
      <p class="text-gray-400 font-secondary-italic">{{ label }}</p>
    </slot>
    <component
      v-if="suffixIcon"
      :is="suffixIcon"
      :class="twMerge('size-5 text-gray-400', iconClass)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import { twMerge } from 'tailwind-merge';

defineProps<{
  label?: string;
  iconClass?: string;
  prefixIcon?: Component;
  suffixIcon?: Component;
}>();
</script>
