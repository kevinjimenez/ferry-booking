<template>
  <div
    :class="[
      'w-full flex flex-col border py-4 px-8 rounded-md shadow-sm items-center justify-center cursor-pointer transition-colors',
      selected
        ? 'border-2 border-secondary bg-base-300'
        : 'border-gray-200 hover:border-2 hover:border-secondary shadow-sm',
    ]"
  >
    <div class="flex gap-y-5 w-full">
      <FerryRoute :origin="origin" :destination="destination" :duration="duration" />
      <div class="flex-1" />
      <div class="w-fit flex flex-col">
        <PriceDisplay :amount="price.amount" :currency="price.currency" :seats="price.seats" />
        <BaseButton @click="$emit('select')">Elegir</BaseButton>
      </div>
    </div>
    <hr class="border-gray-200 border-[0.1rem] w-full mt-8 mb-4" />
    <ScheduleAmenities
      :items="[
        { icon: UserIcon, text: 'Maleta de 5kg' },
        { icon: UserIcon, text: 'Chaleco salvavidas' },
        { icon: UserIcon, text: 'Traslado muelle a muelle' },
      ]"
    />
  </div>
</template>
<script setup lang="ts">
import BaseButton from '@/shared/components/base/BaseButton.vue';
import FerryRoute from '@/modules/ferry/components/FerryRoute.vue';
import PriceDisplay from '@/shared/components/PriceDisplay.vue';
import UserIcon from '@/shared/icons/UserIcon.vue';
import ScheduleAmenities from '@/modules/ferry/components/ScheduleAmenities.vue';

interface StopDetail {
  time: string;
  port: string;
  island: string;
  address: string;
}

interface Price {
  amount: number;
  currency: string;
  seats: number;
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
