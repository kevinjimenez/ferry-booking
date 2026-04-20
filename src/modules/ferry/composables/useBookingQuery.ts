// src/modules/ferry/composables/useBookingData.ts
import { useBookingStore } from '@/modules/ferry/stores/ferry-booking.store';
import { useGetBookingQuery } from '@/modules/ferry/queries/get-booking.query';
import { storeToRefs } from 'pinia';
import { useFerryNavigation } from '@/modules/ferry/composables/useFerryNavigation.ts';
import { watchEffect } from 'vue';

export const useBookingQuery = () => {
  const bookingStore = useBookingStore();
  const { bookingId } = storeToRefs(bookingStore);
  const { goToSearch } = useFerryNavigation();

  watchEffect(async () => {
    if (!bookingId) {
      await goToSearch();
    }
  });

  return useGetBookingQuery(bookingId);
};
