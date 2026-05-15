<template>
  <div class="flex flex-col gap-y-2 items-start justify-center">
    <p class="text-3xs text-text-muted uppercase font-bold">{{ ferryName }}</p>
    <div class="flex items-center justify-start gap-x-2">
      <UserIcon class="size-6 text-ink-500" />
      <UserIcon class="size-6 text-ink-500" />
      <UserIcon class="size-6 text-ink-500" />
    </div>
    <p class="text-2xs text-ink-500 font-bold">{{ seatLabel }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UserIcon from '@/shared/icons/UserIcon.vue';

const props = defineProps<{
  ferryName: string;
  seats: number;
}>();

const seatLabel = computed(() =>
  props.seats > 0 ? `${props.seats} asientos disp.` : 'Agotado',
);
</script>