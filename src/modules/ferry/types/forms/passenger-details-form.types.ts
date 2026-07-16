import type { SelectOption } from '@/shared/components/ui/BaseSelect.vue';

export interface PersonFormValues {
  firstName: string;
  lastName: string;
  country: SelectOption | null;
  city: string;
  legalName: string;
  email: string;
  phone: string;
  documentType: SelectOption | null;
  documentNumber: string;
}

export interface PassengerDetailsFormValues {
  contact: ContactFormValues;
  passengers: PersonFormValues[];
}

export interface ContactFormValues extends PersonFormValues {
  contactType?: string;
}
