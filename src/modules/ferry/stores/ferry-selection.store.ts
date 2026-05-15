import { defineStore } from 'pinia';
import { STORE_KEY } from '@/modules/ferry/constants/ store.constants.ts';
import { useAppStorage } from '@/shared/composables/useAppStorage.ts';
import { FERRY_STORAGE_KEYS } from '@/shared/constants/storage.constants.ts';
import { StorageEnum } from '@/shared/enums';
import type { Ferry } from '@/modules/ferry/types/ferry.types.ts';
import type { FareResponse } from '@/modules/ferry/types/api/responses/fare-response.types.ts';
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

  const setOutbound = (schedule: Ferry) => {
    outbound.value = schedule;
  };
  const setInbound = (schedule: Ferry) => {
    inbound.value = schedule;
  };
  const setOutboundFare = (fare: FareResponse) => {
    outboundFare.value = fare;
  };
  const setInboundFare = (fare: FareResponse) => {
    inboundFare.value = fare;
  };
  const reset = () => {
    outbound.value = null;
    inbound.value = null;
    outboundFare.value = null;
    inboundFare.value = null;
  };

  return { outbound, inbound, outboundFare, inboundFare, setOutbound, setInbound, setOutboundFare, setInboundFare, reset };
});
