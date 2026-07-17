import { useFieldArray, useForm } from 'vee-validate';
import { useFerryPassengersStore } from '@/modules/ferry/stores/ferry-passengers.store';
import { useFerryNavigation } from '@/modules/ferry/composables/useFerryNavigation';
import type {
  PassengerDetailsFormValues,
  PersonFormValues,
} from '@/modules/ferry/types/forms/passenger-details-form.types.ts';
import { passengerDetailsSchema } from '@/modules/ferry/schemas/passenger-details.schema.ts';
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';
import { watchEffect } from 'vue';
import { EMPTY_PERSON } from '@/modules/ferry/constants/passenger-details-form.constants.ts';
import { useTicketAction } from '@/modules/ferry/composables/useTicketAction.ts';
import { useCreateTicketRequest } from '@/modules/ferry/composables/useCreateTicketRequest.ts';
import { useFerryTicketStore } from '@/modules/ferry/stores/ferry-ticket.store.ts';
import { useFerryPaymentStore } from '@/modules/ferry/stores/ferry-payment.store.ts';
import { useLoadingStore } from '@/shared/stores/loading.store.ts';

export const usePassengerDetailsForm = () => {
  const store = useFerryPassengersStore();
  const searchStore = useFerrySearchStore();
  const ticketStore = useFerryTicketStore();
  const paymentStore = useFerryPaymentStore();
  const loadingStore = useLoadingStore();
  const { createTicket } = useTicketAction();
  const { buildBody: createTicketBody } = useCreateTicketRequest();
  const { goToPayment } = useFerryNavigation();

  const { handleSubmit, errors } = useForm<PassengerDetailsFormValues>({
    validationSchema: passengerDetailsSchema,
    initialValues: store.values,
  });

  const { fields: passengers, push, remove } = useFieldArray<PersonFormValues>('passengers');

  watchEffect(() => {
    const count = searchStore.values.passengerCount;
    while (passengers.value.length < count) push({ ...EMPTY_PERSON });
  });

  const onSubmit = handleSubmit(async values => {
    try {
      loadingStore.show();
      if (!ticketStore.ticketId) {
        const request = createTicketBody(values);
        const result = await createTicket(request);
        ticketStore.setTicket(result.id);
        paymentStore.setPayment(result.paymentId);
      }
      store.setFormValues(values);
      await goToPayment();
    } finally {
      loadingStore.hide();
    }
  });

  return { passengers, remove, errors, onSubmit };
};
