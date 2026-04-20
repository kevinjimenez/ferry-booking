import { defineStore } from 'pinia';
import { STORE_KEY } from '@/modules/ferry/constants/ store.constants.ts';
import { useAppStorage } from '@/shared/composables/useAppStorage';
import { FERRY_STORAGE_KEYS } from '@/shared/constants/storage.constants';
import { StorageEnum } from '@/shared/enums';

export const useFerryPaymentStore = defineStore(STORE_KEY.PAYMENT, () => {
  const paymentId = useAppStorage<string | null>(
    FERRY_STORAGE_KEYS.PAYMENT_ID,
    null,
    StorageEnum.SESSION, // PII — nunca LOCAL
  );

  const setPayment = (id: string) => {
    paymentId.value = id;
  };

  const reset = () => {
    paymentId.value = null;
  };

  return { paymentId, setPayment, reset };
});
