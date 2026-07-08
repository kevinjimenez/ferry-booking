<template>
  <div class="w-full h-auto">
    <FerryNavHeader :title="title" @back="handleGotoBack" />

    <div class="flex flex-col w-auto gap-y-4 mt-8 md:px-20 px-10 pb-8">
      <FerryTripCard type="outbound" :date="search.outboundDate" :origin="outbound!.origin"
        :destination="outbound!.destination" :duration="outbound!.duration" :details="[
          { label: 'Código', value: maskString(outbound!.id, 5) },
          { label: 'Embarcación', value: outbound!.ferry.name },
          { label: 'Clase', value: outbound!.ferry.type },
          { label: 'Tarifa', value: `${outboundFare!.name} — ${formatCurrency(parseFloat(outboundFare!.price))}` },
          { label: 'Precio', value: formatCurrency(outbound!.price) },
        ]" @change="handleChange('outbound')" />
      <FerryTripCard v-if="inbound" type="inbound" :date="search.inboundDate!" :origin="inbound.origin"
        :destination="inbound.destination" :duration="inbound.duration" :details="[
          { label: 'Código', value: maskString(inbound!.id, 5) },
          { label: 'Embarcación', value: inbound!.ferry.name },
          { label: 'Clase', value: inbound!.ferry.type },
          { label: 'Tarifa', value: `${inboundFare!.name} — ${formatCurrency(parseFloat(inboundFare!.price))}` },
          { label: 'Precio', value: formatCurrency(inbound!.price) },
        ]" @change="handleChange('inbound')" />

      <DeparturePlanCard :duration="outbound!.duration" :steps="departureSteps" />

      <template v-if="isLoading">
        <div class="skeleton w-auto h-40" />
      </template>

      <ComplementaryServicesCard v-else :services="data || []" @add="handleAddService" />

      <TripTotalFooter :label="buttonLabel" :total="grandTotal" :loading="isPending" @continue="handleContinue" />
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import ComplementaryServicesCard from '@/modules/ferry/components/ComplementaryServicesCard.vue';
import DeparturePlanCard from '@/modules/ferry/components/DeparturePlanCard.vue';
import FerryNavHeader from '@/modules/ferry/components/FerryNavHeader.vue';
import FerryTripCard from '@/modules/ferry/components/FerryTripCard.vue';
import TripTotalFooter from '@/modules/ferry/components/TripTotalFooter.vue';

import { useCreateBooking } from '@/modules/ferry/actions/create-booking.action.ts';
import { useBookingCheckout } from '@/modules/ferry/composables/useBookingCheckout.ts';
import { useFerryNavigation } from '@/modules/ferry/composables/useFerryNavigation.ts';
import { useTripPrice } from '@/modules/ferry/composables/useTripPrice.ts';
import { useBookingStore } from '@/modules/ferry/stores/ferry-booking.store.ts';
import { useFerryPassengersStore } from '@/modules/ferry/stores/ferry-passengers.store.ts';
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';
import { useFerrySelectionStore } from '@/modules/ferry/stores/ferry-selection.store.ts';
import { useFerryTicketStore } from '@/modules/ferry/stores/ferry-ticket.store.ts';
import { useLoadingStore } from '@/shared/stores/loading.store';

import { formatCurrency } from '@/shared/utils/currency.utils.ts';
import { maskString } from '@/shared/utils/string.utils.ts';
import { useGetFareExtrasQuery } from '../queries/get-fare-extras.query';

const { data, isLoading } = useGetFareExtrasQuery()
const storeFerrySearch = useFerrySearchStore();
const storeFerrySelection = useFerrySelectionStore();
const ticketStore = useFerryTicketStore();
const passengersStore = useFerryPassengersStore();
const { values: search, isRoundTrip } = storeToRefs(storeFerrySearch);
const { inbound, outbound, outboundFare, inboundFare } = storeToRefs(storeFerrySelection);

const { createBookingBody, isSameBooking } = useBookingCheckout();
const bookingStore = useBookingStore();
const loadingStore = useLoadingStore();

const title = computed(() =>
  isRoundTrip.value ? 'Confirma tu viaje — Ida y Vuelta' : 'Confirma tu viaje — Ida',
);

const { goToPassengerDetails, goToInbound, goToOutbound } = useFerryNavigation();
const { grandTotal } = useTripPrice();
const { mutateAsync: createBooking, isPending } = useCreateBooking();

const departureSteps = computed(() => {
  if (!outbound.value) return [];
  const dep = dayjs(`2000-01-01 ${outbound.value.origin.time}`);
  return [
    { time: dep.subtract(50, 'minute').format('HH:mm'), text: 'Chequeo en listado del ferry' },
    {
      time: dep.subtract(45, 'minute').format('HH:mm'),
      text: 'Control de equipaje en ABG (Gobierno)',
    },
    {
      time: dep.subtract(10, 'minute').format('HH:mm'),
      text: 'Abordar taxi acuático hacia el ferry',
    },
    {
      time: outbound.value.origin.time,
      text: `Salida desde ${outbound.value.origin.island}`,
      subtitle: outbound.value.origin.description,
    },
  ];
});

// const complementaryServices = computed((): ServiceAddon[] => [
//   {
//     icon: MapPinIcon,
//     title: 'Asistencia Muelle / Hotel',
//     subtitle: `Servicio compartido en ${outbound.value?.origin.island}, Isla ${outbound.value?.origin.island}.`,
//     price: 15,
//     items: [
//       'Asistencia y transporte desde el hotel al muelle principal.',
//       'O del muelle principal al hotel (zona urbana).',
//     ],
//   },
//   {
//     icon: BoxIcon,
//     title: 'Custodio de equipaje',
//     subtitle: 'Hasta 12 horas en oficina de Paradeisos.',
//     price: 10,
//     items: [
//       '1 equipaje de 5kg · 1 de 10kg · 1 de 23kg.',
//       'Registra tu equipaje en la oficina de Paradeisos Ferries.',
//     ],
//   },
//   {
//     icon: MapPinIcon,
//     title: 'Asistencia Muelle / Hotel',
//     subtitle: `Servicio compartido en ${outbound.value?.origin.island}, Isla ${outbound.value?.origin.island}.`,
//     price: 15,
//     items: [
//       'Asistencia y transporte desde el hotel al muelle principal.',
//       'O del muelle principal al hotel (zona urbana).',
//     ],
//   },
//   {
//     icon: BoxIcon,
//     title: 'Custodio de equipaje',
//     subtitle: 'Hasta 12 horas en oficina de Paradeisos.',
//     price: 10,
//     items: [
//       '1 equipaje de 5kg · 1 de 10kg · 1 de 23kg.',
//       'Registra tu equipaje en la oficina de Paradeisos Ferries.',
//     ],
//   },
// ]);

const buttonLabel = computed(() => (isRoundTrip.value ? 'Total Ida y Vuelta' : 'Total Ida'));

const handleChange = async (type: 'outbound' | 'inbound') => {
  bookingStore.reset();
  ticketStore.reset();
  passengersStore.reset();
  if (type === 'inbound') await goToInbound();
  else await goToOutbound();
};

const handleAddService = () => {
  // TODO: implementar lógica de añadir servicio
};

const handleContinue = async () => {
  try {
    loadingStore.show();
    if (!isSameBooking.value) {
      const result = await createBooking(createBookingBody.value);
      bookingStore.setBooking(
        result.id,
        createBookingBody.value.outboundScheduleId,
        createBookingBody.value.returnScheduleId,
      );
    }
    await goToPassengerDetails();
  } finally {
    loadingStore.hide();
  }
};

const handleGotoBack = () => {
  bookingStore.reset();
  ticketStore.reset();
  passengersStore.reset();
  if (isRoundTrip.value) goToInbound();
  else goToOutbound();
};
</script>
