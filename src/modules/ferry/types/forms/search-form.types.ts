import { TicketType } from '@/modules/ferry/enums'

export interface SearchFormValues {
  ticketType: TicketType
  origin: string
  destination: string
  outboundDate: string
  inboundDate?: string
  passengerCount: number
}
