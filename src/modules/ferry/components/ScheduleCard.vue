<template>
  <div
    :class="[
      'w-full flex border py-4 px-8 rounded-md shadow-sm items-center justify-center cursor-pointer transition-colors',
      selected
        ? 'border-2 border-secondary bg-base-300'
        : 'border-gray-200 hover:border-2 hover:border-secondary shadow-sm',
    ]"
  >
    <FerryRoute :origin="origin" :destination="destination" :duration="duration" />
    <div class="flex-1" />
    <div class="w-fit flex flex-col">
      <PriceDisplay :amount="price.amount" :currency="price.currency" :label="price.label" />
      <BaseButton @click="$emit('select')">Elegir</BaseButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import BaseButton from '@/shared/components/base/BaseButton.vue';
import FerryRoute from '@/modules/ferry/components/FerryRoute.vue';
import PriceDisplay from '@/shared/components/PriceDisplay.vue';

interface StopDetail {
  time: string;
  island: string;
  dock: string;
  address: string;
}

interface Price {
  amount: number;
  currency: string;
  label: string;
}

defineProps<{
  origin: StopDetail;
  destination: StopDetail;
  duration: string;
  price: Price;
  selected?: boolean;
}>();

defineEmits<{
  select: [];
}>();
</script>
