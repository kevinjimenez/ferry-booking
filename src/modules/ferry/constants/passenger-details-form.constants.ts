import type {
  PassengerDetailsFormValues,
  PersonFormValues,
} from '@/modules/ferry/types/forms/passenger-details-form.types.ts';

export const EMPTY_PERSON: PersonFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  documentType: null,
  documentNumber: '',
};

export const PASSENGER_DETAILS_INITIAL_VALUES: PassengerDetailsFormValues = {
  contact: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    documentType: null,
    documentNumber: '',
  },
  passengers: [],
};
