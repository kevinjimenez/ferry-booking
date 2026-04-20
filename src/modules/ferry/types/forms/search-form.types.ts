import type { SelectOption } from '@/shared/components/base/BaseSelect.vue';
import { TicketType } from '@/modules/ferry/enums';

export interface SearchFormValues {
  ticketType: TicketType;
  origin: SelectOption | null;
  destination: SelectOption | null;
  outboundDate: string;
  inboundDate?: string;
  passengerCount: number;
}
