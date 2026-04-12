import type { RemovableRef, UseStorageOptions } from '@vueuse/core';
import { useLocalStorage, useSessionStorage } from '@vueuse/core';
import { StorageEnum } from '../enums';

export const useAppStorage = <T>(
  key: string,
  defaultValue: T,
  storageType: StorageEnum,
  options?: UseStorageOptions<T>,
): RemovableRef<T> => {
  return storageType === StorageEnum.SESSION
    ? useSessionStorage(key, defaultValue, options)
    : useLocalStorage(key, defaultValue, options);
};
