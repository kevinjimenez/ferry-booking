<template>
  <div class="flex items-center w-full gap-x-1">
    <!-- Origen -->
    <span class="size-2.5 rounded-full bg-neutral shrink-0" />

    <!-- Segmentos de línea + paradas opcionales -->
    <template v-for="i in segmentsCount" :key="i">
      <div class="flex-1 h-px bg-base-300 border-gray-300 border-[0.1rem]" />
      <span v-if="i < stops!" class="size-1.5 rounded-full bg-base-300 shrink-0" />
    </template>

    <!-- Destino -->
    <ArrowRightDashedIcon class="size-6 text-text-muted shrink-0" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ArrowRightDashedIcon from '@/shared/icons/ArrowRightDashedIcon.vue';

const props = withDefaults(
  defineProps<{
    stops?: number; // paradas intermedias
  }>(),
  { stops: 0 },
);

// Una línea por cada segmento (paradas + 1)
const segmentsCount = computed(() => props.stops + 1);
</script>
