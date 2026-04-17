import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';
import type { Ref } from 'vue';
import { ferryKeys } from '@/modules/ferry/queries/keys/ferry.query-keys';
import { apiServices } from '@/shared/services';
import type { ApiResponse } from '@/shared/types';
import type { BookingResponse } from '@/modules/ferry/types/api/responses/booking-response.types.ts';

const getBookingQuery = async (id: string): Promise<ApiResponse<BookingResponse>> => {
  const response = await apiServices.get(`/seat-holds-history/${id}`);

  if (!response.data) throw new Error(`Failed to fetch booking ${id}`);

  return response.data;
};

export const useGetBookingQuery = (bookingId: Ref<string | null>) => {
  return useQuery({
    queryKey: computed(() => ferryKeys.booking(bookingId.value!)),
    queryFn: () => getBookingQuery(bookingId.value!),
    enabled: computed(() => !!bookingId.value), // no fetcha si no hay id
    // staleTime: 1000 * 60 * 10, // 10 minutos
  });
};
