import { apiServices, loggerServices } from '@/shared/services';
import { useMutation } from '@tanstack/vue-query';

const updatePaymentAction = async (
  id: string,
  body: { id: string; clientTransactionId: string },
) => {
  try {
    // await new Promise(resolve => setTimeout(resolve, 5000));
    const response = await apiServices.patch(`/payments/${id}`, {
      clientTransactionId: body.clientTransactionId,
      transactionId: body.id,
    });
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

export const useUpdatePayment = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: { id: string; clientTransactionId: string } }) =>
      updatePaymentAction(id, body),
    onSuccess: data => loggerServices.log('updatePaymentAction:', data),
    onError: () => {},
  });
};
