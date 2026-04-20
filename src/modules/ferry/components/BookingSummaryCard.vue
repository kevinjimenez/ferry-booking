<template>
  <div class="flex flex-col">
    <div class="flex flex-col border-2 rounded-t-md">
      <span class="text-sm font-semibold text-white bg-primary h-12 flex items-center px-7">
        TU SELECCION
      </span>
    </div>

    <div class="flex flex-col border-2 border-gray-200 rounded-b-md shadow-sm gap-y-5 p-6">
      <EmptyState
        v-if="!outbound"
        title="Tu selección"
        :icon="FerryIcon"
        description="Selecciona un ferry de ida para ver el resumen de tu viaje"
      >
        <BaseButton class="w-full" :prefix-icon="PlusIcon" icon-class="size-5" disabled>
          Elige un horario
        </BaseButton>
      </EmptyState>
      <TripLegSummary v-else v-bind="outbound" badge-label="Ida" />

      <template v-if="isRoundTrip && outbound">
        <EmptyState
          v-if="!inbound"
          title="Tu selección"
          :icon="FerryIcon"
          description="Selecciona un ferry de vuelta para completar tu viaje"
        >
          <BaseButton class="w-full" :prefix-icon="PlusIcon" icon-class="size-5" disabled>
            Elige un horario
          </BaseButton>
        </EmptyState>
        <TripLegSummary v-else v-bind="inbound" badge-label="Vuelta" type="inbound" />
      </template>

      <template v-if="outbound && (!isRoundTrip || inbound)">
        <div class="flex justify-between">
          <span class="text-xl font-semibold">Total</span>
          <span class="text-3xl font-semibold">{{ total }}</span>
        </div>
        <BaseButton size="lg" :suffix-icon="ArrowRightDashedIcon" @click="$emit('continue')">{{
          buttonLabel
        }}</BaseButton>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/shared/components/base/BaseButton.vue';
import FerryIcon from '@/shared/icons/FerryIcon.vue';
import PlusIcon from '@/shared/icons/PlusIcon.vue';
import EmptyState from '@/shared/components/EmptyState.vue';
import TripLegSummary from '@/modules/ferry/components/TripLegSummary.vue';
import ArrowRightDashedIcon from '@/shared/icons/ArrowRightDashedIcon.vue';

interface TripLeg {
  origin: string;
  destination: string;
  ferry: string;
  departure: string;
  arrival: string;
  passengers: string;
  price: string;
}

withDefaults(
  defineProps<{
    outbound?: TripLeg;
    inbound?: TripLeg;
    total: string;
    buttonLabel: string;
    isRoundTrip?: boolean;
  }>(),
  {
    isRoundTrip: false,
  },
);

defineEmits<{ continue: [] }>();
</script>
