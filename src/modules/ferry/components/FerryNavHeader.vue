<template>
  <header class="w-full flex flex-col px-10 gap-y-8 pt-10">
    <div class="flex items-center flex-1 gap-x-1 cursor-default" @click="emit('back')">
      <ArrowRightDashedIcon class="rotate-180 size-7" />
      <span class="text-sm font-medium">Volver</span>
    </div>
    <h1 class="text-h1 font-extrabold">{{ title }}</h1>
    <span v-if="subtitle" class="text-md text-ink-500 font-secondary-italic">{{ subtitle }}</span>
  </header>
</template>

<script setup lang="ts">
import ArrowRightDashedIcon from '@/shared/icons/ArrowRightDashedIcon.vue';

defineProps<{ title: string; subtitle?: string }>();
const emit = defineEmits<{
  back: [];
}>();
</script>
