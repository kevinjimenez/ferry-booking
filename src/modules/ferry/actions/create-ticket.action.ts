import { apiServices, loggerServices } from '@/shared/services';
import { useMutation } from '@tanstack/vue-query';
import type { CreateTicketRequest } from '@/modules/ferry/types/api/requests/create-ticket-request.types.ts';
import type { ApiResponse } from '@/shared/types';
import type { TicketResponse } from '@/modules/ferry/types/api/responses/ticket-response.types.ts';

const createTicketAction = async (body: CreateTicketRequest) => {
  try {
    //! TODO: create interface response
    const response = await apiServices.post<ApiResponse<TicketResponse>>('/tickets', body);
    if (!response.data) {
      const errorString = `Failed to fetch ports. Status: ${response.status || 'No response data'}`;
      throw new Error(errorString);
    }

    const { data } = response.data;

    return data;
  } catch (error) {
    const errorString = error instanceof Error ? error.message : 'An unexpected error occurred';
    loggerServices.error('Error in createTicketAction:', errorString);
    throw new Error(errorString);
  }
};

export const useCreateTicket = () => {
  return useMutation({
    mutationFn: createTicketAction,
    onSuccess: async data => {
      loggerServices.log('createTicketAction:', data);
    },
    onError: () => {},
  });
};
