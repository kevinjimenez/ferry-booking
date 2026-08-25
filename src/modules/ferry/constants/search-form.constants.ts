import type { ButtonGroupOption } from '@/shared/components/ui/base-button-group.types';
import { TicketType } from '@/modules/ferry/enums';
import type { SearchFormValues } from '@/modules/ferry/types';

// `label` holds an i18n key (see `ferry.searchFormConstants.ticketType`), resolved via `t()` where consumed.
export const TICKET_TYPE_OPTIONS: ButtonGroupOption[] = [
  { label: 'ferry.searchFormConstants.ticketType.oneWay', value: TicketType.ONE_WAY },
  { label: 'ferry.searchFormConstants.ticketType.roundTrip', value: TicketType.ROUND_TRIP },
];

// Isla Santa Cruz opera como hub: el resto de islas solo tienen ruta directa hacia/desde ella.
export const HUB_ISLAND_CODE = 'SCX';

export const SEARCH_FORM_INITIAL_VALUES: SearchFormValues = {
  ticketType: TicketType.ONE_WAY,
  origin: null,
  destination: null,
  outboundDate: '',
  inboundDate: '',
  passengerCount: 1,
};
