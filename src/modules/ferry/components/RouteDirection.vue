<template>
  <div class="flex gap-x-1 lg:gap-x-3 w-full">
    <PortLabel :name="originName" :island="originIsland" />
      <ArrowRightDashedIcon class="mx-2 lg:mx-5 size-7 sm:size-10 lg:size-14 text-primary" />
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
