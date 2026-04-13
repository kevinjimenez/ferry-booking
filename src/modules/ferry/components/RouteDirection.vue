<template>
  <div class="flex gap-x-3 w-full">
    <PortLabel :name="originName" :island="originIsland" />
    <div class="divider text-gray-400 min-w-1/2 max-w-1/2">
      <ArrowLeftIcon class="rotate-180 size-14 text-primary" />
    </div>
    <PortLabel :name="destinationName" :island="destinationIsland" />
  </div>
</template>
<script setup lang="ts">
import ArrowLeftIcon from '@/shared/icons/ArrowLeftIcon.vue';
import PortLabel from '@/modules/ferry/components/PortLabel.vue';

defineProps<{
  originName: string;
  originIsland: string;
  destinationName: string;
  destinationIsland: string;
}>();
</script>
