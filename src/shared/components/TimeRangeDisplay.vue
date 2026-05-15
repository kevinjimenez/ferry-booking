<template>
  <div class="flex gap-x-2">
    <ClockIcon class="size-5 text-primary" />
    <div class="flex text-primary items-center gap-x-1">
      <span class="text-xs font-semibold">{{ departure }}</span>
      <ArrowRightDashedIcon class="size-5" />
      <span class="text-xs font-semibold">{{ arrival }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import ClockIcon from '@/shared/icons/ClockIcon.vue';
import ArrowRightDashedIcon from '@/shared/icons/ArrowRightDashedIcon.vue';

defineProps<{
  departure: string;
  arrival: string;
}>();
</script>