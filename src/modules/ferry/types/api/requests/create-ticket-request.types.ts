import type { PersonFormValues } from '@/modules/ferry/types/forms/passenger-details-form.types.ts';

export interface CreateTicketRequest {
  tripType: string;
  outboundSchedule: string;
  returnSchedule?: string | null;
  outboundHold: string;
  returnHold?: string | null;
  contact: Person;
  passenger: Passenger[];
}

export interface Person extends Omit<PersonFormValues, 'documentType' | 'country'> {
  documentType: string;
  country: string;
}

export interface Passenger extends Omit<Person, 'legalName'> {
  outboundFareId: string;
  returnFareId?: string | null;
  basePrice: number;
  isPrimary: boolean;
  checkedInOutbound: boolean;
  checkedInReturn: boolean;
  extras?: PassengerExtraRequest[];
}

export interface PassengerExtraRequest {
  extraId: string;
  quantity: number;
}
