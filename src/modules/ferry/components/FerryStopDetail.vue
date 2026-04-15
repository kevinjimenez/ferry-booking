<template>
  <div class="flex flex-col w-fit">
    <h1 :class="twMerge('text-h1 font-semibold', customClass?.timeClass)">{{ time }}</h1>
    <p :class="twMerge('text-base font-semibold text-secondary', customClass?.portClass)">
      {{ port }}
    </p>
    <p :class="twMerge('text-xs font-semibold', customClass?.islandClass)">{{ island }}</p>
    <small :class="twMerge('text-2xs font-normal text-text-muted', customClass?.addressClass)">{{
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
}

defineProps<{
  time: string;
  port: string;
  island: string;
  address?: string;
  customClass?: StopDetailCustomClass;
}>();
</script>
