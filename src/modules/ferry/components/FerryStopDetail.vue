<template>
  <div :class="['flex flex-col w-full', customClass?.alignmentClass]">
    <h2 :class="twMerge('text-h6 sm:text-h3 md:text-h2 font-extrabold mb-2', customClass?.timeClass)">{{ time }}</h2>
    <p :class="twMerge('text-2xs md:text-sm font-semibold text-secondary', customClass?.islandClass)">
      {{ island }}
    </p>
    <small :class="twMerge('text-3xs font-normal text-ink-500', customClass?.descriptionClass)">{{
      description
    }}</small>
  </div>
</template>
<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

export interface StopDetailCustomClass {
  timeClass?: string;
  islandClass?: string;
  descriptionClass?: string;
  alignmentClass?: string;
}

defineProps<{
  time: string;
  island: string;
  description?: string;
  customClass?: StopDetailCustomClass;
}>();
</script>
