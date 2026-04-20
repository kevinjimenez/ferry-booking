import type { NavigationGuard } from 'vue-router';
import { readAppStorage, removeAppStorage } from '@/shared/utils/storage.utils.ts';
import { FERRY_STORAGE_KEYS } from '@/shared/constants/storage.constants.ts';
import { StorageEnum } from '@/shared/enums';
import { FERRY_ROUTE_NAMES } from '@/modules/ferry/constants';

const toSearch = () => ({ name: FERRY_ROUTE_NAMES.SEARCH });

export const paymentGuard: NavigationGuard = () => {
  const completed = readAppStorage<boolean>(
    FERRY_STORAGE_KEYS.PAYMENT_COMPLETED,
    StorageEnum.SESSION,
  );
  if (completed) {
    removeAppStorage(FERRY_STORAGE_KEYS.PAYMENT_COMPLETED, StorageEnum.SESSION);
    return toSearch();
  }
  if (!readAppStorage(FERRY_STORAGE_KEYS.BOOKING_ID, StorageEnum.SESSION)) return toSearch();

  const passengers = readAppStorage<{ contact: { firstName: string } }>(
    FERRY_STORAGE_KEYS.PASSENGERS,
    StorageEnum.SESSION,
  );
  if (!passengers?.contact?.firstName) return toSearch();
};
