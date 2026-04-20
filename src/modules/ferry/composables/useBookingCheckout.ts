import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';
import type { CreateBookingRequest } from '@/modules/ferry/types/api/requests/create-booking-request.types.ts';
import { useBookingStore } from '@/modules/ferry/stores/ferry-booking.store.ts';
import { loggerServices } from '@/shared/services';

export const useBookingCheckout = () => {
  const route = useRoute();
  const searchStore = useFerrySearchStore();
  const bookingStore = useBookingStore();

  const outbound = computed(() => route.query.outbound as string);
  const inbound = computed(() => route.query.inbound as string | undefined);

  const createBookingBody = computed(() => {
    const body: CreateBookingRequest = {
      outboundScheduleId: outbound.value,
      totalPassengers: searchStore.values.passengerCount,
    };

    if (inbound.value) body.returnScheduleId = inbound.value;

    loggerServices.log(body);
    return body;
  });

  const isSameBooking = computed(
    () =>
      !!bookingStore.bookingId &&
      bookingStore.outboundScheduleId === createBookingBody.value.outboundScheduleId &&
      bookingStore.returnScheduleId === (createBookingBody.value.returnScheduleId ?? null),
  );

  return { createBookingBody, isSameBooking };
};
