import type { SelectOptions } from '@/shared/components/ui/BaseSelect.vue';
import type {
  PassengerDetailsFormValues,
  PersonFormValues,
} from '@/modules/ferry/types/forms/passenger-details-form.types.ts';

export const DOCUMENT_TYPES: SelectOptions = [
  { label: 'Cédula', value: 'dni' },
  { label: 'Pasaporte', value: 'passport' },
  { label: 'RUC', value: 'ruc' },
];

export const CONTACT_TYPES: SelectOptions = [
  { label: 'Persona Natural', value: 'natural_person' },
  { label: 'Persona Juridica', value: 'juridical_person' },
];

export const EMPTY_PERSON: PersonFormValues = {
  firstName: '',
  lastName: '',
  legalName: '',
  country: null,
  city: '',
  email: '',
  phone: '',
  documentType: null,
  documentNumber: '',
};

export const PASSENGER_DETAILS_INITIAL_VALUES: PassengerDetailsFormValues = {
  contact: {
    contactType: 'natural_person',
    firstName: '',
    lastName: '',
    legalName: '',
    country: null,
    city: '',
    email: '',
    phone: '',
    documentType: null,
    documentNumber: '',
  },
  passengers: [],
};
