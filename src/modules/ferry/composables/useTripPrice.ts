import { storeToRefs } from 'pinia';
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';
import { useFerrySelectionStore } from '@/modules/ferry/stores/ferry-selection.store.ts';
import { computed } from 'vue';

export const useTripPrice = () => {
  const { values } = storeToRefs(useFerrySearchStore());
  const { outbound, inbound } = storeToRefs(useFerrySelectionStore());

  const outboundUnitPrice = computed(() => outbound.value?.price ?? 0);
  const outboundTotal = computed(() => outboundUnitPrice.value * values.value.passengerCount);

  const inboundUnitPrice = computed(() => inbound.value?.price ?? 0);
  const inboundTotal = computed(() => inboundUnitPrice.value * values.value.passengerCount);

  const unitPriceTotal = computed(() => outboundUnitPrice.value + inboundUnitPrice.value);
  const grandTotal = computed(() => outboundTotal.value + inboundTotal.value);

  return {
    outboundTotal,
    inboundTotal,
    grandTotal,
    outboundUnitPrice,
    inboundUnitPrice,
    unitPriceTotal,
  };
};
