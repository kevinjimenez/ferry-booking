import { defineStore } from 'pinia';
import { computed } from 'vue';
import type { SearchFormValues } from '@/modules/ferry/types';
import { SEARCH_FORM_INITIAL_VALUES } from '@/modules/ferry/constants';
import { STORE_KEY } from '@/modules/ferry/constants/ store.constants.ts';
import { useAppStorage } from '@/shared/composables/useAppStorage.ts';
import { StorageEnum } from '@/shared/enums';
import { FERRY_STORAGE_KEYS } from '@/shared/constants/storage.constants.ts';
import { TicketType } from '@/modules/ferry/enums';

export const useFerrySearchStore = defineStore(STORE_KEY.SEARCH, () => {
  // const formValues = ref<SearchFormValues>(SEARCH_FORM_INITIAL_VALUES);
  //
  const formValues = useAppStorage<SearchFormValues>(
    FERRY_STORAGE_KEYS.SEARCH,
    SEARCH_FORM_INITIAL_VALUES,
    StorageEnum.SESSION,
  );

  // setter
  const setFormValues = (values: SearchFormValues) => {
    formValues.value = values;
  };

  // getters
  const values = computed(() => formValues.value);
  const isRoundTrip = computed(() => values.value.ticketType === TicketType.ROUND_TRIP);
  // const searchQueryParams = computed(() => {
  //   return {
  //     origin: values.value.origin?.value,
  //     destination: values.value.destination?.value,
  //     outboundDate: values.value.outboundDate,
  //   };
  // });

  // methods
  const reset = () => {
    formValues.value = SEARCH_FORM_INITIAL_VALUES;
  };

  return { values, isRoundTrip, setFormValues, reset };
});
