import type { NavigationGuard } from 'vue-router';
import { readAppStorage } from '@/shared/utils/storage.utils.ts';
import { FERRY_STORAGE_KEYS } from '@/shared/constants/storage.constants.ts';
import { StorageEnum } from '@/shared/enums';
import { FERRY_ROUTE_NAMES } from '@/modules/ferry/constants';

const toSearch = () => ({ name: FERRY_ROUTE_NAMES.SEARCH });

export const successGuard: NavigationGuard = () => {
  const success = readAppStorage<{ successPaymentId: string; successTicketId: string } | null>(
    FERRY_STORAGE_KEYS.SUCCESS,
    StorageEnum.SESSION,
  );
  const hasTicket =
    readAppStorage(FERRY_STORAGE_KEYS.TICKET_ID, StorageEnum.SESSION) || success?.successTicketId;
  if (!hasTicket) return toSearch();
};
