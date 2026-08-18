import type { SelectOptions } from '@/shared/components/ui/BaseSelect.vue';
import type {
  PassengerDetailsFormValues,
  PersonFormValues,
} from '@/modules/ferry/types/forms/passenger-details-form.types.ts';

// `label` holds an i18n translation key (not display text). Consuming components
// must resolve it through `t()` before handing the options to <BaseSelect>/<BaseRadio>.
export const DOCUMENT_TYPES: SelectOptions = [
  { label: 'ferry.passengerDetailsFormConstants.documentTypes.dni', value: 'dni' },
  { label: 'ferry.passengerDetailsFormConstants.documentTypes.passport', value: 'passport' },
  { label: 'ferry.passengerDetailsFormConstants.documentTypes.ruc', value: 'ruc' },
];

export const CONTACT_TYPES: SelectOptions = [
  { label: 'ferry.passengerDetailsFormConstants.contactTypes.naturalPerson', value: 'natural_person' },
  { label: 'ferry.passengerDetailsFormConstants.contactTypes.juridicalPerson', value: 'juridical_person' },
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
