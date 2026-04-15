import { storeToRefs } from 'pinia';
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';
import { useFerrySelectionStore } from '@/modules/ferry/stores/ferry-selection.store.ts';
import { computed } from 'vue';

export const useTripPrice = () => {
  const { values } = storeToRefs(useFerrySearchStore());
  const { outbound, inbound } = storeToRefs(useFerrySelectionStore());

  const outboundTotal = computed(() => (outbound.value?.price ?? 0) * values.value.passengerCount);

  const inboundTotal = computed(() => (inbound.value?.price ?? 0) * values.value.passengerCount);

  const grandTotal = computed(() => outboundTotal.value + inboundTotal.value);

  return { outboundTotal, inboundTotal, grandTotal };
};
