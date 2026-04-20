import { StorageEnum } from '@/shared/enums';

const getStorage = (storageType: StorageEnum) =>
  storageType === StorageEnum.SESSION ? sessionStorage : localStorage;

export const readAppStorage = <T>(key: string, storageType: StorageEnum): T | null => {
  const raw = getStorage(storageType).getItem(key);
  if (raw === null || raw === 'null') return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return raw as unknown as T;
  }
};

export const removeAppStorage = (key: string, storageType: StorageEnum): void => {
  getStorage(storageType).removeItem(key);
};

export const removeAllAppStorage = (storageType: StorageEnum): void => {
  getStorage(storageType).clear();
};
