import type { NavigationGuard } from 'vue-router';
import { readAppStorage } from '@/shared/utils/storage.utils.ts';
import { FERRY_STORAGE_KEYS } from '@/shared/constants/storage.constants.ts';
import { StorageEnum } from '@/shared/enums';
import { FERRY_ROUTE_NAMES } from '@/modules/ferry/constants';

const toSearch = () => ({ name: FERRY_ROUTE_NAMES.SEARCH });

export const inboundGuard: NavigationGuard = () => {
  if (!readAppStorage(FERRY_STORAGE_KEYS.SCHEDULE_OUTBOUND, StorageEnum.SESSION)) return toSearch();
};
