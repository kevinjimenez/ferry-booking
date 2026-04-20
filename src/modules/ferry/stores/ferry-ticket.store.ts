import { defineStore } from 'pinia';
import { STORE_KEY } from '@/modules/ferry/constants/ store.constants.ts';
import { useAppStorage } from '@/shared/composables/useAppStorage';
import { FERRY_STORAGE_KEYS } from '@/shared/constants/storage.constants';
import { StorageEnum } from '@/shared/enums';

export const useFerryTicketStore = defineStore(STORE_KEY.TICKET, () => {
  const ticketId = useAppStorage<string | null>(
    FERRY_STORAGE_KEYS.TICKET_ID,
    null,
    StorageEnum.SESSION, // PII — nunca LOCAL
  );

  const setTicket = (id: string) => {
    ticketId.value = id;
  };

  const reset = () => {
    ticketId.value = null;
  };

  return { ticketId, setTicket, reset };
});
