<template>
  <div :class="[
    'w-full flex flex-col border-2 pt-4 pb-3 px-4 lg:pt-8 lg:pb-4 lg:px-8 rounded-md items-center justify-center cursor-pointer transition-all duration-200',
    selected
      ? 'border-secondary bg-secondary/5 shadow-md'
      : 'border-gray-200 shadow-sm hover:border-secondary/40 hover:shadow-md bg-white',
  ]">
    <!-- Mobile layout -->
    <div class="flex w-full items-center gap-x-5 sm:gap-x-40 lg:hidden">
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between text-md sm:text-h5 font-bold text-primary">
          <span>{{ origin.time }}</span>
          <span class="text-xs text-ink-500 font-normal">{{ duration }}</span>
          <span>{{ destination.time }}</span>
        </div>
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between text-sm sm:text-base text-secondary font-semibold mt-0.5 gap-y-2">
          <span class="truncate">{{ origin.port }}</span>
          <span class="truncate text-right">{{ destination.port }}</span>
        </div>
        <span class="text-xs sm:text-sm text-ink-500 mt-1 block">{{ ferry.name }}</span>
      </div>
      <div class="flex flex-col items-end shrink-0 gap-y-1 justify-center">
        <PriceDisplay :amount="price.amount" :currency="price.currency" :seats="price.seats" />
        <BaseButton v-if="!selected" size="lg" @click="$emit('select')">Elegir</BaseButton>
        <div v-else class="flex items-center justify-center rounded-full bg-secondary size-10 self-center">
          <CheckIcon class="size-6 text-white" />
        </div>
      </div>
    </div>

    <!-- Desktop layout -->
    <div class="hidden lg:flex gap-y-5 w-full">
      <div class="flex w-full">
        <FerryRoute :origin="origin" :destination="destination" :duration="duration"
          :origin-stop-detail-class="{ alignmentClass: 'items-start' }"
          :destination-stop-detail-class="{ alignmentClass: 'items-end' }" />
        <BaseDivider class="rotate-180 h-20 mx-5 self-center" />
        <ScheduleFerryInfo :ferry-name="ferry.name" :seats="price.seats" />
      </div>
      <div class="flex-1" />
      <div class="w-28 flex flex-col">
        <PriceDisplay :amount="price.amount" :currency="price.currency" :seats="price.seats" />
        <BaseButton v-if="!selected" @click="$emit('select')">Elegir</BaseButton>
        <div v-else class="flex items-center justify-center rounded-full bg-secondary size-12 self-center mx-auto">
          <CheckIcon class="size-6 text-white" />
        </div>
      </div>
    </div>
    <hr class="hidden lg:block border-gray-200 border-[0.1rem] w-full mt-8 mb-4" />
    <ScheduleAmenities class="hidden lg:flex" :items="[
      { icon: UserIcon, text: 'Maleta de 5kg' },
      { icon: UserIcon, text: 'Chaleco salvavidas' },
      { icon: UserIcon, text: 'Traslado muelle a muelle' },
    ]" />
  </div>
</template>
<script setup lang="ts">
import BaseButton from '@/shared/components/ui/BaseButton.vue';
import FerryRoute from '@/modules/ferry/components/FerryRoute.vue';
import PriceDisplay from '@/shared/components/PriceDisplay.vue';
import UserIcon from '@/shared/icons/UserIcon.vue';
import CheckIcon from '@/shared/icons/CheckIcon.vue';
import ScheduleAmenities from '@/modules/ferry/components/ScheduleAmenities.vue';
import ScheduleFerryInfo from '@/modules/ferry/components/ScheduleFerryInfo.vue';
import BaseDivider from '@/shared/components/ui/BaseDivider.vue';

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
  ferry: { name: string };
  selected?: boolean;
}>();

defineEmits<{
  select: [];
}>();
</script>
