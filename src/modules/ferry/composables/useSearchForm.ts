import { useForm } from 'vee-validate';
import { searchFormSchema } from '@/modules/ferry/schemas';
import type { SearchFormValues } from '@/modules/ferry/types';
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';
import { useFerryNavigation } from '@/modules/ferry/composables/useFerryNavigation.ts';
import { computed, watch, type Ref } from 'vue';
import { TicketType } from '@/modules/ferry/enums';
import { HUB_ISLAND_CODE } from '@/modules/ferry/constants';
import type { SelectOption } from '@/shared/components/ui/BaseSelect.vue';

const isHubIsland = (option?: SelectOption | null) => (option?.extra as { code?: string } | undefined)?.code === HUB_ISLAND_CODE;

export const useSearchForm = (islands?: Ref<SelectOption[] | undefined>) => {
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

  // Isla Santa Cruz es el hub: el resto de islas solo conectan hacia/desde ella.
  const nonHubValues = computed(
    () => (islands?.value ?? []).filter(option => !isHubIsland(option)).map(option => option.value),
  );

  const destinationDisabledValues = computed(() => {
    const values: Array<string | number> = [];
    if (origin.value) values.push(origin.value.value);
    if (origin.value && !isHubIsland(origin.value)) values.push(...nonHubValues.value);
    return values;
  });

  const originDisabledValues = computed(() => {
    const values: Array<string | number> = [];
    if (destination.value) values.push(destination.value.value);
    if (destination.value && !isHubIsland(destination.value)) values.push(...nonHubValues.value);
    return values;
  });

  watch(origin, () => {
    if (destination.value && destinationDisabledValues.value.includes(destination.value.value)) {
      setFieldValue('destination', null);
    }
  });

  watch(destination, () => {
    if (origin.value && originDisabledValues.value.includes(origin.value.value)) {
      setFieldValue('origin', null);
    }
  });

  return {
    isRoundTrip,
    errors,
    onSubmit,
    ticketType,
    origin,
    originAttrs,
    originDisabledValues,
    destination,
    destinationAttrs,
    destinationDisabledValues,
    passengerCount,
    outboundDate,
    outboundDateAttrs,
    inboundDate,
    inboundDateAttrs,
    setFieldValue,
  };
};
