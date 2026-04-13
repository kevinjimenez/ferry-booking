<template>
  <div
    class="w-full flex border border-gray-200 p-4 rounded-md shadow-sm items-center justify-between"
  >
    <RouteDirection
      :origin-name="originName"
      :origin-island="originIsland"
      :destination-name="destinationName"
      :destination-island="destinationIsland"
    />
    <div class="flex w-full justify-end items-center gap-x-5">
      <div class="flex">
        <BaseIconLabel :prefix-icon="UserIcon" icon-class="size-4 text-text-muted">
          <small class="text-text-muted text-2xs">{{ duration }}</small>
        </BaseIconLabel>
        <!--            <UserIcon class="size-4 text-text-muted" />-->
        <!--            <small class="text-text-muted text-2xs">~2h 30m</small>-->
      </div>

      <div class="flex flex-col items-end">
        <small class="text-text-muted text-2xs">{{ date }}</small>
        <small class="text-text-muted text-2xs">{{ passengers }} pasajeros</small>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import UserIcon from '@/shared/icons/UserIcon.vue';
import BaseIconLabel from '@/shared/components/base/BaseIconLabel.vue';
import RouteDirection from '@/modules/ferry/components/RouteDirection.vue';

defineProps<{
  originName: string;
  originIsland: string;
  destinationName: string;
  destinationIsland: string;
  date: string;
  passengers: number;
  duration: string;
}>();
</script>
