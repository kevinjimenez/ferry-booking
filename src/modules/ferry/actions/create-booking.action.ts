import { apiServices, loggerServices } from '@/shared/services';
import type { CreateBookingRequest } from '@/modules/ferry/types/api/requests/create-booking-request.types.ts';
import { useMutation } from '@tanstack/vue-query';

const createBookingAction = async (body: CreateBookingRequest) => {
  try {
    // await new Promise(resolve => setTimeout(resolve, 5000));
    const response = await apiServices.post<{ data: { id: string } }>('/booking', body);

    if (!response.data) {
      const errorString = `Failed to fetch ports. Status: ${response.status || 'No response data'}`;
      throw new Error(errorString);
    }

    const { data } = response.data;

    return data;
  } catch (error) {
    const errorString = error instanceof Error ? error.message : 'An unexpected error occurred';
    loggerServices.error('Error in createBookingAction:', errorString);
    throw new Error(errorString);
  }
};

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: createBookingAction,
    onSuccess: async data => {
      loggerServices.log('createBookingAction:', data);
    },
    onError: () => {},
  });
};
