import type { ButtonGroupOption } from '@/shared/components/ui/base-button-group.types';
import { TicketType } from '@/modules/ferry/enums';
import type { SearchFormValues } from '@/modules/ferry/types';

export const TICKET_TYPE_OPTIONS: ButtonGroupOption[] = [
  { label: 'Sola ida', value: TicketType.ONE_WAY },
  { label: 'Ida y vuelta', value: TicketType.ROUND_TRIP },
];

export const SEARCH_FORM_INITIAL_VALUES: SearchFormValues = {
  ticketType: TicketType.ONE_WAY,
  origin: null,
  destination: null,
  outboundDate: '',
  inboundDate: '',
  passengerCount: 1,
};
