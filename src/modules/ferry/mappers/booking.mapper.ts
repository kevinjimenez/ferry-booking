import type { CreateTicketRequest } from '@/modules/ferry/types/api/requests/create-ticket-request.types.ts';
import type { BookingResponse } from '@/modules/ferry/types/api/responses/booking-response.types.ts';
import type { PersonFormValues } from '@/modules/ferry/types/forms/passenger-details-form.types.ts';

export class BookingMapper {
  static toTicketRequest(
    tripType: string,
    outbound: string,
    booking: BookingResponse,
    contact: PersonFormValues,
    passengers: PersonFormValues[],
    unitPrice: number,
    inbound?: string,
  ): CreateTicketRequest {
    return {
      tripType,
      outboundSchedule: outbound,
      returnSchedule: inbound,
      outboundHold: booking.outbound_seat_hold_id,
      returnHold: booking.return_seat_hold_id,
      contact: {
        ...contact,
        documentType: (contact.documentType!.value as string).toLowerCase(),
      },
      passenger: passengers.map(passenger => ({
        ...passenger,
        documentType: (contact.documentType!.value as string).toLowerCase(),
        unitPrice, // suma de ida + vuelta si existiera
        isPrimary: true,
        checkedInOutbound: false,
        checkedInReturn: false,
      })),
    };
  }
}
