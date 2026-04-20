import type { NavigationGuard } from 'vue-router';
import { readAppStorage } from '@/shared/utils/storage.utils.ts';
import { FERRY_STORAGE_KEYS } from '@/shared/constants/storage.constants.ts';
import { StorageEnum } from '@/shared/enums';
import { TicketType } from '@/modules/ferry/enums';
import { FERRY_ROUTE_NAMES } from '@/modules/ferry/constants';

const toSearch = () => ({ name: FERRY_ROUTE_NAMES.SEARCH });

export const tripSummaryGuard: NavigationGuard = () => {
  const outbound = readAppStorage(FERRY_STORAGE_KEYS.SCHEDULE_OUTBOUND, StorageEnum.SESSION);
  if (!outbound) return toSearch();

  const search = readAppStorage<{ ticketType: string }>(
    FERRY_STORAGE_KEYS.SEARCH,
    StorageEnum.SESSION,
  );
  if (search?.ticketType === TicketType.ROUND_TRIP) {
    if (!readAppStorage(FERRY_STORAGE_KEYS.SCHEDULE_INBOUND, StorageEnum.SESSION))
      return toSearch();
  }
};
