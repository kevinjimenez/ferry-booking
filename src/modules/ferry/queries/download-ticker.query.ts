import { useMutation } from '@tanstack/vue-query';
import { apiServices } from '@/shared/services';

const downloadTicketPdf = async (id: string): Promise<void> => {
  const response = await apiServices.get(`/tickets/${id}/pdf`, {
    responseType: 'blob',
  });

  const url = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `ticket-${id}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
};

export const useDownloadTicket = () => {
  return useMutation({
    mutationFn: (ticketId: string) => downloadTicketPdf(ticketId),
  });
};