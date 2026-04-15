<template>
  <div class="flex gap-x-3 w-full">
    <PortLabel :name="originName" :island="originIsland" />
    <div class="divider text-gray-400 min-w-1/2 max-w-1/2">
      <ArrowRightDashedIcon class="size-14 text-primary" />
    </div>
    <PortLabel :name="destinationName" :island="destinationIsland" />
  </div>
</template>
<script setup lang="ts">
import PortLabel from '@/modules/ferry/components/PortLabel.vue';
import ArrowRightDashedIcon from '@/shared/icons/ArrowRightDashedIcon.vue';

defineProps<{
  originName: string;
  originIsland: string;
  destinationName: string;
  destinationIsland: string;
}>();
</script>
