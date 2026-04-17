import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';
import { useFerrySelectionStore } from '@/modules/ferry/stores/ferry-selection.store.ts';
import { useBookingQuery } from '@/modules/ferry/composables/useBookingQuery.ts';
import { BookingMapper } from '@/modules/ferry/mappers/booking.mapper.ts';
import type { PassengerDetailsFormValues } from '@/modules/ferry/types/forms/passenger-details-form.types.ts';

export const useCreateTicketRequest = () => {
  const searchStore = useFerrySearchStore();
  const selectionStore = useFerrySelectionStore();
  const { data: booking } = useBookingQuery();

  const buildBody = (values: PassengerDetailsFormValues) => {
    const { contact, passengers } = values;
    return BookingMapper.toTicketRequest(
      searchStore.values.ticketType,
      selectionStore.outbound!.id,
      booking.value!.data,
      contact,
      passengers,
      selectionStore.inbound?.id,
    );
  };

  return { buildBody };
};
