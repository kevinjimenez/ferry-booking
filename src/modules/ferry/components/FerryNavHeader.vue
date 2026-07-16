<template>
  <header :class="twMerge('w-full flex flex-col px-8 sm:px-10 gap-y-4 sm:gap-y-8 pt-6', props.classContainer)">
    <div class="flex items-center flex-1 gap-x-1 cursor-default" @click="emit('back')">
      <ArrowRightDashedIcon class="rotate-180 size-7" />
      <span class="text-sm font-medium">Volver</span>
    </div>
    <h1 class="text-xl sm:text-h1 font-extrabold">{{ title }}</h1>
    <span v-if="subtitle" class="text-xs sm:text-md text-ink-500 font-secondary-italic">{{ subtitle }}</span>
  </header>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import ArrowRightDashedIcon from '@/shared/icons/ArrowRightDashedIcon.vue';

const props = defineProps<{ title: string; subtitle?: string; classContainer?: string }>();
const emit = defineEmits<{
  back: [];
}>();
</script>
