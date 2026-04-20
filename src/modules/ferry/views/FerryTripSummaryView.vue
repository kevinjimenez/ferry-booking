<template>
  <FerryNavHeader :title="title" @back="handleGotoBack" />

  <div class="flex flex-col w-full justify-center items-center">
    <div class="flex w-full justify-center items-center gap-x-10 mt-8">
      <FerryTripCard
        :passenger-count="search.passengerCount"
        type="outbound"
        :date="search.outboundDate"
        :origin="outbound!.origin"
        :destination="outbound!.destination"
        :duration="outbound!.duration"
        :badges="['2h 00m', 'Clase Premium', '20 pasajeros']"
        :details="[
          { label: 'Codigo', value: maskString(outbound!.id, 5) },
          { label: 'Embarcacion', value: outbound!.ferry.name },
          { label: 'Clase', value: outbound!.ferry.type },
          { label: 'Precio', value: formatCurrency(outbound!.price) },
        ]"
        :subtotal="outboundTotal"
        @change="handleChange('outbound')"
      />
      <FerryTripCard
        :passengerCount="search.passengerCount"
        v-if="inbound"
        type="inbound"
        :date="search.inboundDate!"
        :origin="inbound.origin"
        :destination="inbound.destination"
        :duration="inbound.duration"
        :badges="['2h 00m', 'Clase Premium', '20 pasajeros']"
        :details="[
          { label: 'Codigo', value: maskString(inbound!.id, 5) },
          { label: 'Embarcacion', value: inbound!.ferry.name },
          { label: 'Clase', value: inbound!.ferry.type },
          { label: 'Precio', value: formatCurrency(inbound!.price) },
        ]"
        :subtotal="inboundTotal"
        @change="handleChange('inbound')"
      />
    </div>

    <div class="flex flex-col w-1/3">
      <LabelValue
        class="my-8"
        :label="buttonLabel"
        :value="formatCurrency(grandTotal)"
        :custom-class="{
          label: 'text-lg text-primary font-semibold',
          value: 'text-2xl text-secondary font-semibold',
        }"
      />
      <BaseButton @click="handleContinue" :loading="isPending" :suffix-icon="ArrowRightDashedIcon">
        Continuar
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFerryNavigation } from '@/modules/ferry/composables/useFerryNavigation.ts';
import FerryNavHeader from '@/modules/ferry/components/FerryNavHeader.vue';
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';
import { computed } from 'vue';
import BaseButton from '@/shared/components/base/BaseButton.vue';
import FerryTripCard from '@/modules/ferry/components/FerryTripCard.vue';
import { formatCurrency } from '@/shared/utils/currency.utils.ts';
import LabelValue from '@/shared/components/LabelValue.vue';
import ArrowRightDashedIcon from '@/shared/icons/ArrowRightDashedIcon.vue';
import { useFerrySelectionStore } from '@/modules/ferry/stores/ferry-selection.store.ts';
import { storeToRefs } from 'pinia';
import { useTripPrice } from '@/modules/ferry/composables/useTripPrice.ts';
import { maskString } from '@/shared/utils/string.utils.ts';
import { useCreateBooking } from '@/modules/ferry/actions/create-booking.action.ts';
import { useBookingCheckout } from '@/modules/ferry/composables/useBookingCheckout.ts';
import { useLoadingStore } from '@/shared/stores/loading.store';
import { useBookingStore } from '@/modules/ferry/stores/ferry-booking.store.ts';
import { useFerryTicketStore } from '@/modules/ferry/stores/ferry-ticket.store.ts';
import { useFerryPassengersStore } from '@/modules/ferry/stores/ferry-passengers.store.ts';
import { useRouter } from 'vue-router';

const router = useRouter();
const storeFerrySearch = useFerrySearchStore();
const storeFerrySelection = useFerrySelectionStore();
const ticketStore = useFerryTicketStore();
const passengersStore = useFerryPassengersStore();
const { values: search, isRoundTrip } = storeToRefs(storeFerrySearch);
const { inbound, outbound } = storeToRefs(storeFerrySelection);

const { createBookingBody, isSameBooking } = useBookingCheckout();
const bookingStore = useBookingStore();
const loadingStore = useLoadingStore();

const title = computed(() =>
  isRoundTrip.value ? 'Confirma tu viaje — Ida y Vuelta' : 'Confirma tu viaje — Ida',
);

const { goToPassengerDetails, goToInbound, goToOutbound } = useFerryNavigation();
const { grandTotal, inboundTotal, outboundTotal } = useTripPrice();
const { mutateAsync: createBooking, isPending } = useCreateBooking();

const handleChange = async (type: 'outbound' | 'inbound') => {
  bookingStore.reset(); // limpia bookingId de sessionStorage
  ticketStore.reset(); // limpia ticketId de sessionStorage
  passengersStore.reset();
  if (type === 'inbound') await goToInbound();
  await goToOutbound();
};

const buttonLabel = computed(() => (isRoundTrip.value ? 'Total Ida y Vuelta' : 'Total Ida'));

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
  bookingStore.reset(); // limpia bookingId de sessionStorage
  ticketStore.reset(); // limpia ticketId de sessionStorage
  passengersStore.reset();
  router.back();
};
</script>
