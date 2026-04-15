import { defineStore } from 'pinia';
import { STORE_KEY } from '@/modules/ferry/constants/ store.constants.ts';
import { useAppStorage } from '@/shared/composables/useAppStorage.ts';
import { FERRY_STORAGE_KEYS } from '@/shared/constants/storage.constants.ts';
import { StorageEnum } from '@/shared/enums';

export const useBookingStore = defineStore(STORE_KEY.BOOKING, () => {
  const bookingId = useAppStorage<string | null>(
    FERRY_STORAGE_KEYS.BOOKING_ID,
    null,
    StorageEnum.SESSION,
  );
  const outboundScheduleId = useAppStorage<string | null>(
    FERRY_STORAGE_KEYS.BOOKING_OUTBOUND_ID,
    null,
    StorageEnum.SESSION,
  );
  const returnScheduleId = useAppStorage<string | null>(
    FERRY_STORAGE_KEYS.BOOKING_RETURN_ID,
    null,
    StorageEnum.SESSION,
  );

  const setBooking = (id: string, outbound: string, inbound: string | null | undefined) => {
    bookingId.value = id;
    outboundScheduleId.value = outbound;
    returnScheduleId.value = inbound;
  };

  const reset = () => {
    bookingId.value = null;
    outboundScheduleId.value = null;
    returnScheduleId.value = null;
  };

  return { bookingId, outboundScheduleId, returnScheduleId, setBooking, reset };
});
