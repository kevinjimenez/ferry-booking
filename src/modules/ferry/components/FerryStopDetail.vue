<template>
  <div :class="['flex flex-col w-fit', customClass?.alignmentClass]">
    <h2 :class="twMerge('text-h2 font-extrabold mb-2', customClass?.timeClass)">{{ time }}</h2>
    <p :class="twMerge('text-sm font-semibold text-secondary', customClass?.portClass)">
      {{ port }}
    </p>
    <p :class="twMerge('text-xs font-medium', customClass?.islandClass)">{{ island }}</p>
    <small :class="twMerge('text-3xs font-normal text-ink-500', customClass?.addressClass)">{{
      address
    }}</small>
  </div>
</template>
<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

export interface StopDetailCustomClass {
  timeClass?: string;
  portClass?: string;
  islandClass?: string;
  addressClass?: string;
  alignmentClass?: string;
}

defineProps<{
  time: string;
  port: string;
  island: string;
  address?: string;
  customClass?: StopDetailCustomClass;
}>();
</script>
