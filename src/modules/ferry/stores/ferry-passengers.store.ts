import { defineStore } from 'pinia';
import { STORE_KEY } from '@/modules/ferry/constants/ store.constants.ts';
import { useAppStorage } from '@/shared/composables/useAppStorage.ts';
import { FERRY_STORAGE_KEYS } from '@/shared/constants/storage.constants.ts';
import { StorageEnum } from '@/shared/enums';
import { computed } from 'vue';
import type { PassengerDetailsFormValues } from '@/modules/ferry/types/forms/passenger-details-form.types.ts';
import { PASSENGER_DETAILS_INITIAL_VALUES } from '@/modules/ferry/constants/passenger-details-form.constants.ts';

export const useFerryPassengersStore = defineStore(STORE_KEY.PASSENGERS, () => {
  const formValues = useAppStorage<PassengerDetailsFormValues>(
    FERRY_STORAGE_KEYS.PASSENGERS,
    PASSENGER_DETAILS_INITIAL_VALUES,
    StorageEnum.SESSION, // PII nunca en LOCAL
  );

  const values = computed(() => formValues.value);

  const setFormValues = (values: PassengerDetailsFormValues) => {
    formValues.value = values;
  };

  const reset = () => {
    formValues.value = PASSENGER_DETAILS_INITIAL_VALUES;
  };

  return { values, setFormValues, reset };
});
