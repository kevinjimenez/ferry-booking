<template>
  <div class="flex justify-between">
    <span :class="twMerge('text-md text-text-muted', props.customClass?.label)">{{ label }}</span>
    <span :class="twMerge('text-base font-semibold', props.customClass?.value)">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

export interface LabelValueClass {
  label?: string;
  value?: string;
}

const props = defineProps<{ label: string; value: string; customClass?: LabelValueClass }>();
</script>