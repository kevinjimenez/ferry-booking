<template>
  <div class="flex flex-col items-start justify-center gap-x-2">
    <p class="sm:text-sm text-text-muted font-bold">{{ badgeLabel }}</p>
    <div class="flex text-primary items-center gap-x-1 w-full justify-between">
      <span class="text-base font-bold">{{ origin }}</span>
      <ArrowRightDashedIcon class="size-10" />
      <span class="text-base font-bold">{{ destination }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowRightDashedIcon from '@/shared/icons/ArrowRightDashedIcon.vue';

defineProps<{
  badgeLabel: string;
  origin: string;
  destination: string;
}>();
</script>
