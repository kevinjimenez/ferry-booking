import { useForm } from 'vee-validate';
import { searchFormSchema } from '@/modules/ferry/schemas';
import type { SearchFormValues } from '@/modules/ferry/types';
import { TicketType } from '@/modules/ferry/enums';
import { computed } from 'vue';
import { SEARCH_FORM_INITIAL_VALUES } from '@/modules/ferry/constants';
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';
import { SearchFerryMapper } from '@/modules/ferry/mappers';

export const useSearchForm = () => {
  const store = useFerrySearchStore();

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

  const isRoundTrip = computed(() => ticketType.value === TicketType.ROUND_TRIP);

  const onSubmit = handleSubmit(values => {
    console.log(values);
    store.setFormValues(values); // ← persiste al hacer submit
    SearchFerryMapper.toRequest();
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
