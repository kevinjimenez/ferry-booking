<template>
  <div class="flex flex-col">
    <div class="flex items-center gap-x-2">
      <BaseBadge :label="badgeLabel" :variant="badgeVariant" label-class="text-3xs" />
      <div class="flex text-text-muted items-center gap-x-1">
        <small>{{ origin }}</small>
        <ArrowRightDashedIcon class="size-5" />
        <small>{{ destination }}</small>
      </div>
    </div>
    <div class="flex flex-col mt-2">
      <LabelValue label="Ferry" :value="ferry" />
      <LabelValue label="Salida" :value="departure" />
      <LabelValue label="Llegada" :value="arrival" />
      <LabelValue label="Pasajeros" :value="passengers" />
      <LabelValue label="Precio" :value="price" />
    </div>
    <hr class="border-gray-200 mt-2.5 border-[0.1rem]" />
  </div>
</template>

<script setup lang="ts">
import BaseBadge from '@/shared/components/base/BaseBadge.vue';
import ArrowRightDashedIcon from '@/shared/icons/ArrowRightDashedIcon.vue';
import LabelValue from '@/shared/components/LabelValue.vue';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    type?: 'outbound' | 'inbound';
    badgeLabel: string;
    origin: string;
    destination: string;
    ferry: string;
    departure: string;
    arrival: string;
    passengers: string;
    price: string;
  }>(),
  {
    type: 'outbound',
  },
);

const badgeVariant = computed(() => (props.type === 'inbound' ? 'secondary' : 'primary'));
</script>
