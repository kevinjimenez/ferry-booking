import { useQuery } from '@tanstack/vue-query';
import type { Ref } from 'vue';
import { computed } from 'vue';
import { ferryKeys } from '@/modules/ferry/queries/keys/ferry.query-keys';
import { apiServices } from '@/shared/services';
import type { ApiResponse } from '@/shared/types';
import type { GetTicketResponse } from '@/modules/ferry/types/api/responses/ticket-response.types.ts';

const getTicketQuery = async (id: string) => {
  // await new Promise(resolve => setTimeout(resolve, 5000));
  const response = await apiServices.get<ApiResponse<GetTicketResponse>>(`/tickets/${id}`);

  if (!response.data) throw new Error(`Failed to fetch booking ${id}`);

  const { data } = response.data;

  console.log('data', data);

  return data;
};

export const useGetTicketQuery = (ticketId: Ref<string | null>) => {
  return useQuery({
    queryKey: computed(() => ferryKeys.ticket(ticketId.value!)),
    queryFn: () => getTicketQuery(ticketId.value!),
    enabled: computed(() => !!ticketId.value), // no fetcha si no hay id
    // staleTime: 1000 * 60 * 10, // 10 minutos
  });
};
