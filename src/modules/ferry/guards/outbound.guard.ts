import { FERRY_ROUTE_NAMES } from '@/modules/ferry/constants';
import type { NavigationGuard } from 'vue-router';
import { readAppStorage } from '@/shared/utils/storage.utils.ts';
import { FERRY_STORAGE_KEYS } from '@/shared/constants/storage.constants.ts';
import { StorageEnum } from '@/shared/enums';

const toSearch = () => ({ name: FERRY_ROUTE_NAMES.SEARCH });

export const outboundGuard: NavigationGuard = () => {
  const search = readAppStorage<{ origin: unknown; destination: unknown; outboundDate: string }>(
    FERRY_STORAGE_KEYS.SEARCH,
    StorageEnum.SESSION,
  );
  if (!search?.origin || !search?.destination || !search?.outboundDate) return toSearch();
};
