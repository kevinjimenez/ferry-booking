<template>
  <div :class="[
    'w-full flex flex-col border-2 pt-4 pb-3 px-4 md:pt-8 md:pb-4 md:px-8 rounded-md items-center justify-center cursor-default transition-all duration-200',
    selected
      ? 'border-primary shadow-md'
      : 'border-gray-200 shadow-sm hover:border-primary/40 hover:shadow-md bg-white',
  ]">
    <!-- Mobile layout -->
    <div class="flex flex-col sm:flex-row w-full sm:items-center gap-x-5 md:hidden">
      <div class="flex-1">
        <FerryRoute :origin="origin" :destination="destination" :duration="duration"
          :origin-stop-detail-class="{ alignmentClass: 'items-start', descriptionClass: 'hidden' }"
          :destination-stop-detail-class="{ alignmentClass: 'items-end', descriptionClass: 'hidden' }" />
        <hr class="block border-gray-200 border-[0.1rem] w-full mt-4 mb-1" />
        <div class="flex flex-col gap-y-2">
          <ScheduleFerryInfo :ferry-name="ferry.name" :seats="price.seats" />
          <ScheduleAmenities :show-title='false' class="flex flex-wrap gap-y-1" :items="[
            { icon: BriefcaseIcon, text: 'Maleta de 5kg' },
            { icon: LifeJacketIcon, text: 'Chaleco salvavidas' },
            { icon: CarIcon, text: 'Traslado muelle a muelle' },
          ]" />
        </div>
      </div>
      <div
        class="flex flex-row sm:flex-col items-center sm:shrink-0 gap-y-1 sm:justify-center justify-between w-full sm:w-auto">
        <PriceDisplay :amount="price.amount" :currency="price.currency" :seats="price.seats" />
        <BaseButton v-if="!selected" size="lg" @click="$emit('select')">
          Elegir
        </BaseButton>
        <div v-else class="flex items-center justify-center rounded-full bg-secondary size-10 self-center">
          <CheckIcon class="size-6 text-white" />
        </div>
      </div>
    </div>

    <!-- Desktop layout -->
    <div class="hidden md:flex gap-y-5 gap-x-2 w-full justify-between">
      <div class="flex w-full">
        <FerryRoute :origin="origin" :destination="destination" :duration="duration"
          :origin-stop-detail-class="{ alignmentClass: 'items-start' }"
          :destination-stop-detail-class="{ alignmentClass: 'items-end' }" class="w-full" />
        <BaseDivider class="rotate-180 h-20 mx-5 self-center" />
        <ScheduleFerryInfo :ferry-name="ferry.name" :seats="price.seats" />
      </div>
      <div class="flex flex-col">
        <PriceDisplay :amount="price.amount" :currency="price.currency" :seats="price.seats" />
        <BaseButton v-if="!selected" size="md" @click="$emit('select')">Elegir</BaseButton>
        <div v-else class="flex items-center justify-center rounded-full bg-secondary size-12 self-center mx-auto">
          <CheckIcon class="size-6 text-white" />
        </div>
      </div>
    </div>
    <hr class="hidden md:block border-gray-200 border-[0.1rem] w-full mt-8 mb-4" />
    <ScheduleAmenities class="hidden md:flex" :items="[
      { icon: BriefcaseIcon, text: 'Maleta de 5kg' },
      { icon: LifeJacketIcon, text: 'Chaleco salvavidas' },
      { icon: CarIcon, text: 'Traslado muelle a muelle' },
    ]" />
  </div>
</template>
<script setup lang="ts">
import FerryRoute from '@/modules/ferry/components/FerryRoute.vue';
import ScheduleAmenities from '@/modules/ferry/components/ScheduleAmenities.vue';
import ScheduleFerryInfo from '@/modules/ferry/components/ScheduleFerryInfo.vue';
import PriceDisplay from '@/shared/components/PriceDisplay.vue';
import BaseButton from '@/shared/components/ui/BaseButton.vue';
import BaseDivider from '@/shared/components/ui/BaseDivider.vue';
import BriefcaseIcon from '@/shared/icons/BriefcaseIcon.vue';
import CarIcon from '@/shared/icons/CarIcon.vue';
import CheckIcon from '@/shared/icons/CheckIcon.vue';
import LifeJacketIcon from '@/shared/icons/LifeJacketIcon.vue';

interface StopDetail {
  time: string;
  island: string;
  description: string;
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
