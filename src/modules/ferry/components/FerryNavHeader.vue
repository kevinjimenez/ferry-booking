<template>
  <header
    class="w-full h-12 flex bg-gray-50 items-center border-b border-b-gray-200 shadow-sm px-10"
  >
    <div class="flex items-center flex-1 cursor-default" @click="emit('back')">
      <ArrowLeftIcon />
      <span class="text-sm">Volver</span>
    </div>
    <span class="text-base font-medium">{{ title }}</span>
    <div class="flex-1" />
  </header>
</template>

<script setup lang="ts">
import ArrowLeftIcon from '@/shared/icons/ArrowLeftIcon.vue';

defineProps<{ title: string }>();
const emit = defineEmits<{
  back: [];
}>();
</script>
