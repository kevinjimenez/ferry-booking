<template>
  <div class="px-160">
    <FerryNavHeader title="Datos del contacto y pasajeros" @back="$router.back()" />
  <div class="flex flex-col gap-y-10 px-20 py-10">
    <FerryContactSection name-prefix="contact" />

    <FerryPassengersSection :passengers="passengers" />

    <BaseButton @click="onSubmit" :suffix-icon="ArrowRightDashedIcon" height="h-[4.5rem]">
    <span class="text-sm font-bold">{{ buttonLabel }}</span>
  </BaseButton>
  </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/shared/components/base/BaseButton.vue';
import FerryNavHeader from '@/modules/ferry/components/FerryNavHeader.vue';
import FerryContactSection from '@/modules/ferry/components/FerryContactSection.vue';
import FerryPassengersSection from '@/modules/ferry/components/FerryPassengersSection.vue';
import { usePassengerDetailsForm } from '@/modules/ferry/composables/usePassengerDetailsForm.ts';
import { useTripPrice } from '@/modules/ferry/composables/useTripPrice.ts';
import { computed } from 'vue';
import ArrowRightDashedIcon from '@/shared/icons/ArrowRightDashedIcon.vue';
import { formatCurrency } from '@/shared/utils/currency.utils.ts';

const { onSubmit, passengers } = usePassengerDetailsForm();
const { grandTotal } = useTripPrice();

const buttonLabel = computed(() => `Procesar el pago (${formatCurrency(grandTotal.value)})`);
</script>
