import { defineStore } from 'pinia';
import { STORE_KEY } from '@/modules/ferry/constants/ store.constants.ts';
import { useAppStorage } from '@/shared/composables/useAppStorage.ts';
import { FERRY_STORAGE_KEYS } from '@/shared/constants/storage.constants.ts';
import { StorageEnum } from '@/shared/enums';
import type { Ferry } from '@/modules/ferry/types/ferry.types.ts';
import { StorageSerializers } from '@vueuse/core';

export const useFerrySelectionStore = defineStore(STORE_KEY.SELECTION, () => {
  // const outbound = useAppStorage<SelectedSchedule | null>(
  //   FERRY_STORAGE_KEYS.SCHEDULE_OUTBOUND,
  //   null,
  //   StorageEnum.SESSION,
  // );
  const outbound = useAppStorage<Ferry | null>(
    FERRY_STORAGE_KEYS.SCHEDULE_OUTBOUND,
    null,
    StorageEnum.SESSION,
    { serializer: StorageSerializers.object },
  );
  const inbound = useAppStorage<Ferry | null>(
    FERRY_STORAGE_KEYS.SCHEDULE_INBOUND,
    null,
    StorageEnum.SESSION,
    { serializer: StorageSerializers.object },
  );

  const setOutbound = (schedule: Ferry) => {
    outbound.value = schedule;
  };
  const setInbound = (schedule: Ferry) => {
    inbound.value = schedule;
  };
  const reset = () => {
    outbound.value = null;
    inbound.value = null;
  };

  return { outbound, inbound, setOutbound, setInbound, reset };
});
