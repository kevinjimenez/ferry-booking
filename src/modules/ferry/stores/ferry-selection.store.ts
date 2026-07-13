import { defineStore } from 'pinia';
import { STORE_KEY } from '@/modules/ferry/constants/ store.constants.ts';
import { useAppStorage } from '@/shared/composables/useAppStorage.ts';
import { FERRY_STORAGE_KEYS } from '@/shared/constants/storage.constants.ts';
import { StorageEnum } from '@/shared/enums';
import type { Ferry } from '@/modules/ferry/types/ferry.types.ts';
import type { FareResponse } from '@/modules/ferry/types/api/responses/fare-response.types.ts';
import { StorageSerializers } from '@vueuse/core';

export interface SelectedExtra {
  id: string;
  title: string;
  price: number;
}

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
  const outboundFare = useAppStorage<FareResponse | null>(
    FERRY_STORAGE_KEYS.FARE_OUTBOUND,
    null,
    StorageEnum.SESSION,
    { serializer: StorageSerializers.object },
  );
  const inboundFare = useAppStorage<FareResponse | null>(
    FERRY_STORAGE_KEYS.FARE_INBOUND,
    null,
    StorageEnum.SESSION,
    { serializer: StorageSerializers.object },
  );

  const selectedExtras = useAppStorage<SelectedExtra[]>(
    FERRY_STORAGE_KEYS.FARE_EXTRAS,
    [],
    StorageEnum.SESSION,
    { serializer: StorageSerializers.object },
  );

  const setOutbound = (schedule: Ferry) => {
    outbound.value = schedule;
  };
  const setInbound = (schedule: Ferry) => {
    inbound.value = schedule;
  };
  const setOutboundFare = (fare: FareResponse | null) => {
    outboundFare.value = fare;
  };
  const setInboundFare = (fare: FareResponse | null) => {
    inboundFare.value = fare;
  };
  const reset = () => {
    outbound.value = null;
    inbound.value = null;
    outboundFare.value = null;
    inboundFare.value = null;
    selectedExtras.value = [];
  };

  const toggleExtra = (extra: SelectedExtra) => {
    const exists = selectedExtras.value.some(e => e.id === extra.id);
    selectedExtras.value = exists
      ? selectedExtras.value.filter(e => e.id !== extra.id)
      : [...selectedExtras.value, extra];
  };

  return {
    outbound,
    inbound,
    outboundFare,
    inboundFare,
    selectedExtras,
    setOutbound,
    setInbound,
    setOutboundFare,
    setInboundFare,
    reset,
    toggleExtra,
  };
});
