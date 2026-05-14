<template>
  <div class="px-160">
    <FerryNavHeader :title="headerTitle" :subtitle="headerSubtitle" @back="goToBack" />

    <section class="flex flex-col w-full p-10 gap-10 items-center justify-center self-center">
      <FareTripSummaryBar
        departure-time="09:00"
        arrival-time="11:00"
        origin="Santa Cruz"
        destination="San Cristóbal"
        pier="Muelle Turístico Gus Angermeyer"
        route-type="DIRECTO"
        duration="2H 00MIN"
        :is-round-trip="false"
      />

      <div class="flex gap-x-2 justify-around items-center w-full">
        <FareCard
          v-for="fare in fares"
          :key="fare.name"
          :name="fare.name"
          :price="fare.price"
          :description="fare.description"
          :features="fare.features"
          :variant="fare.variant"
          @select="selectedFare = fare.name"
        />
      </div>

      <FareSelectionFooter
        :footer-label="footerLabel"
        :selected-fare-name="selectedFare"
        :button-label="buttonLabel"
        @continue="handleContinue"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import FerryNavHeader from '@/modules/ferry/components/FerryNavHeader.vue';
import FareTripSummaryBar from '@/modules/ferry/components/FareTripSummaryBar.vue';
import FareCard from '@/modules/ferry/components/FareCard.vue';
import type { FareFeature } from '@/modules/ferry/components/FareCard.vue';
import FareSelectionFooter from '@/modules/ferry/components/FareSelectionFooter.vue';
import { useFerryNavigation } from '@/modules/ferry/composables/useFerryNavigation.ts';
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';

interface Fare {
  name: string;
  price: number;
  description: string;
  features: FareFeature[];
  variant: 'primary' | 'secondary';
}

const route = useRoute();
const router = useRouter();
const { isRoundTrip } = storeToRefs(useFerrySearchStore());
const { goToInbound, goToTripSummary } = useFerryNavigation();

const isOutbound = computed(() => route.meta.direction === 'outbound');

const headerTitle = computed(() =>
  isOutbound.value ? 'Selecciona la tarifa para tu ida' : 'Selecciona la tarifa para tu vuelta',
);
const headerSubtitle =
  'Una vez hecha la reserva, no podrás cambiar la tarifa seleccionada para hacer cambios en tu ticket.';

const footerLabel = computed(() => (isOutbound.value ? 'Tarifa de ida' : 'Tarifa de vuelta'));

const buttonLabel = computed(() => {
  if (isOutbound.value && isRoundTrip.value) return 'Seleccionar Ferry';
  return 'Continuar';
});

const handleContinue = () => {
  if (isOutbound.value && isRoundTrip.value) {
    goToInbound();
  } else {
    goToTripSummary();
  }
};

const goToBack = () => router.back();

const defaultFeatures: FareFeature[] = [
  { text: 'Maleta de 5kg', included: true },
  { text: 'Chaleco salvavidas', included: true },
  { text: 'Traslado muelle a muelle', included: false },
  { text: 'Snack a bordo', included: false },
  { text: 'Seguro de viaje', included: false },
];

const fares: Fare[] = [
  {
    name: 'Basico',
    price: 35,
    description: 'Pago completo al reservar. Equipaje 5kg + 23kg. Sin cambios ni reembolso.',
    features: defaultFeatures,
    variant: 'primary',
  },
  {
    name: 'Light',
    price: 45,
    description: 'Pago completo al reservar. Equipaje 5kg + 23kg. Sin cambios ni reembolso.',
    features: defaultFeatures,
    variant: 'secondary',
  },
  {
    name: 'Plus',
    price: 60,
    description: 'Pago completo al reservar. Equipaje 5kg + 23kg. Sin cambios ni reembolso.',
    features: defaultFeatures,
    variant: 'primary',
  },
];

const selectedFare = ref(fares[1]?.name ?? '');
</script>