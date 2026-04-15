<template>
  <div class="flex flex-col items-center my-1">
    <span class="text-h1"> {{ amount }} </span>
    <span class="text-h6"> {{ currency }} </span>
    <BaseBadge
      :label="seatLabel"
      soft
      :variant="props.seats > 0 ? 'info' : 'error'"
      :prefix-icon="SeatIcon"
      icon-class="size-4"
    />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import BaseBadge from '@/shared/components/base/BaseBadge.vue';
import SeatIcon from '@/shared/icons/SeatIcon.vue';

const props = defineProps<{
  amount: number;
  currency: string;
  seats: number;
}>();

const seatLabel = computed(() => (props.seats > 0 ? `${props.seats} disp.` : 'Agotado'));
</script>
