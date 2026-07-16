import type { CreateTicketRequest } from '@/modules/ferry/types/api/requests/create-ticket-request.types.ts';
import type { BookingResponse } from '@/modules/ferry/types/api/responses/booking-response.types.ts';
import type { PersonFormValues } from '@/modules/ferry/types/forms/passenger-details-form.types.ts';
import type { SelectedExtra } from '../stores/ferry-selection.store';

export class BookingMapper {
  static toTicketRequest(
    tripType: string,
    outbound: string,
    booking: BookingResponse,
    contact: PersonFormValues,
    passengers: PersonFormValues[],
    basePrice: number,
    outboundFareId: string,
    inbound?: string,
    returnFareId?: string,
    selectedExtras: SelectedExtra[] = [],
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
        country: contact.country?.value as string,
      },
      passenger: passengers.map((passenger, index) => {
        const { legalName: _legalName, ...passengerFields } = passenger;
        return {
          ...passengerFields,
          documentType: (passenger.documentType!.value as string).toLowerCase(),
          country: passenger.country?.value as string,
          outboundFareId,
          returnFareId,
          basePrice,
          isPrimary: index === 0,
          checkedInOutbound: false,
          checkedInReturn: false,
          extras: index === 0 ? selectedExtras.map(e => ({ extraId: e.id, quantity: 1 })) : undefined,
        };
      }),
    };
  }
}
