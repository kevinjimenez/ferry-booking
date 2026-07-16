import { storeToRefs } from 'pinia';
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';
import { useFerrySelectionStore } from '@/modules/ferry/stores/ferry-selection.store.ts';
import { computed } from 'vue';

export const useTripPrice = () => {
  const { values } = storeToRefs(useFerrySearchStore());
  const { outbound, inbound, outboundFare, inboundFare, selectedExtras } =
    storeToRefs(useFerrySelectionStore());

  const outboundUnitPrice = computed(
    () => (outbound.value?.price ?? 0) + parseFloat(outboundFare.value?.price ?? '0'),
  );
  const outboundTotal = computed(() => outboundUnitPrice.value * values.value.passengerCount);

  const inboundUnitPrice = computed(
    () => (inbound.value?.price ?? 0) + parseFloat(inboundFare.value?.price ?? '0'),
  );
  const inboundTotal = computed(() => inboundUnitPrice.value * values.value.passengerCount);

  const extrasTotal = computed(() => selectedExtras.value.reduce((sum, e) => sum + e.price, 0));

  const unitPriceTotal = computed(() => outboundUnitPrice.value + inboundUnitPrice.value);
  const grandTotal = computed(() => outboundTotal.value + inboundTotal.value + extrasTotal.value);

  return {
    outboundTotal,
    inboundTotal,
    grandTotal,
    outboundUnitPrice,
    inboundUnitPrice,
    unitPriceTotal,
  };
};
