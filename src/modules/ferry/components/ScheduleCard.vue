<template>
  <div
    :class="[
      'w-full flex flex-col border-2 pt-8 pb-4 px-8 rounded-md items-center justify-center cursor-pointer transition-all duration-200 ',
      selected
        ? 'border-secondary bg-secondary/5 shadow-md '
        : 'border-gray-200 shadow-sm hover:border-secondary/40 hover:shadow-md bg-white',
    ]"
  >
    <div class="flex gap-y-5 w-full">
      <div class="flex w-full">
        <FerryRoute
          :origin="origin"
          :destination="destination"
          :duration="duration"
          :origin-stop-detail-class="{ alignmentClass: 'items-start' }"
          :destination-stop-detail-class="{ alignmentClass: 'items-end' }"
        />
        <BaseDivider class="rotate-180 h-20 mx-5 self-center" />
        <ScheduleFerryInfo :ferry-name="ferry.name" :seats="price.seats" />
      </div>
      <div class="flex-1" />
      <div class="w-28 flex flex-col">
        <PriceDisplay :amount="price.amount" :currency="price.currency" :seats="price.seats" />
        <BaseButton v-if="!selected" @click="$emit('select')">Elegir</BaseButton>
        <div
          v-else
          class="flex items-center justify-center rounded-full bg-secondary size-12 self-center mx-auto"
        >
          <CheckIcon class="size-6 text-white" />
        </div>
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
import CheckIcon from '@/shared/icons/CheckIcon.vue';
import ScheduleAmenities from '@/modules/ferry/components/ScheduleAmenities.vue';
import ScheduleFerryInfo from '@/modules/ferry/components/ScheduleFerryInfo.vue';
import BaseDivider from '@/shared/components/base/BaseDivider.vue';

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
