<template>
  <div :class="twMerge(
    'w-full border-gray-200 border-2 rounded-sm shadow-md flex flex-col p-5 gap-y-8 bg-white',
    props.containerClass,
  )
    ">
    <BaseIconLabel :prefix-icon="icon" :icon-class="twMerge('size-7 text-primary', props.iconClass)">
      <span :class="twMerge('text-lg text-primary font-semibold', props.titleClass)">{{
        title
        }}</span>
    </BaseIconLabel>
    <slot />
  </div>
</template>

twMerge( 'text-lg text-primary font-semibold', props.containerClass)

<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import BaseIconLabel from '@/shared/components/ui/BaseIconLabel.vue';
import type { Component } from 'vue';

const props = defineProps<{
  icon?: Component;
  title?: string;
  containerClass?: string;
  iconClass?: string;
  titleClass?: string;
}>();
</script>
