import type { SelectOption } from '@/shared/components/ui/BaseSelect.vue';

export interface PersonFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  documentType: SelectOption | null;
  documentNumber: string;
}

export interface PassengerDetailsFormValues {
  contact: PersonFormValues;
  passengers: PersonFormValues[];
}
