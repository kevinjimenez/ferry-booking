import type { ButtonGroupOption } from '@/shared/components/base/base-button-group.types.ts'
import { TicketType } from '@/modules/ferry/enums'

export const TICKET_TYPE_OPTIONS: ButtonGroupOption[] = [
  { label: 'Sola ida', value: TicketType.ONE_WAY },
  { label: 'Ida y vuelta', value: TicketType.ROUND_TRIP },
]
