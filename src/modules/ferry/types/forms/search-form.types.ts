import type { SelectOption } from '@/shared/components/base/BaseSelect.vue';
import { TicketType } from '@/modules/ferry/enums';

export interface SearchFormValues {
  ticketType: TicketType;
  origin: SelectOption;
  destination: SelectOption;
  outboundDate: string;
  inboundDate?: string;
  passengerCount: number;
}
