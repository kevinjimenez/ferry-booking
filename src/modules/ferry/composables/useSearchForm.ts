import { useForm } from 'vee-validate';
import { searchFormSchema } from '@/modules/ferry/schemas';
import type { SearchFormValues } from '@/modules/ferry/types';
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';
import { useFerryNavigation } from '@/modules/ferry/composables/useFerryNavigation.ts';
import { computed, watch } from 'vue';
import { TicketType } from '@/modules/ferry/enums';

export const useSearchForm = () => {
  const store = useFerrySearchStore();
  const { goToOutbound } = useFerryNavigation();

  const { handleSubmit, defineField, errors, setFieldValue } = useForm<SearchFormValues>({
    validationSchema: searchFormSchema,
    initialValues: store.values,
  });

  const [ticketType] = defineField('ticketType');
  const [origin, originAttrs] = defineField('origin');
  const [destination, destinationAttrs] = defineField('destination');
  const [outboundDate, outboundDateAttrs] = defineField('outboundDate');
  const [inboundDate, inboundDateAttrs] = defineField('inboundDate');
  const [passengerCount] = defineField('passengerCount');

  const onSubmit = handleSubmit(async values => {
    store.setFormValues(values);
    await goToOutbound();
  });

  const isRoundTrip = computed(() => ticketType.value === TicketType.ROUND_TRIP);

  watch(isRoundTrip, val => {
    if (!val) setFieldValue('inboundDate', '');
  });

  return {
    isRoundTrip,
    // Form state
    errors,
    onSubmit,
    ticketType,
    origin,
    originAttrs,
    destination,
    destinationAttrs,
    passengerCount,
    outboundDate,
    outboundDateAttrs,
    inboundDate,
    inboundDateAttrs,
    setFieldValue,
  };
};
