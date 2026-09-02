import { useMutation } from '@tanstack/vue-query';
import { apiServices } from '@/shared/services';

export type ReportFormat = 'pdf' | 'excel';

export interface TicketsReportFilter {
  startDate: string;
  endDate: string;
  format: ReportFormat;
  status?: string;
  paymentStatus?: string;
}

const FILE_EXTENSION_BY_FORMAT: Record<ReportFormat, string> = {
  pdf: 'pdf',
  excel: 'xlsx',
};

const downloadTicketsReport = async (filter: TicketsReportFilter): Promise<void> => {
  const response = await apiServices.get('/reports/tickets', {
    params: filter,
    responseType: 'blob',
  });

  const url = URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.download = `reporte-tickets.${FILE_EXTENSION_BY_FORMAT[filter.format]}`;
  link.click();
  URL.revokeObjectURL(url);
};

export const useDownloadTicketsReport = () => {
  return useMutation({
    mutationFn: (filter: TicketsReportFilter) => downloadTicketsReport(filter),
  });
};
