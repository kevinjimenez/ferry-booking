<template>
  <div class="flex w-full justify-center items-center">
    <BaseCard container-class="w-[50rem] p-0 justify-center items-center gap-y-10">
      <BaseSuccessHeader
        :icon="CheckIcon"
        title="¡Pago Realizado con Éxito!"
        subtitle="Su transacción ha sido procesada correctamente."
      />

      <div class="flex flex-col w-full px-16 pb-10">
        <FerryOrderSummaryCard order-id="##ORD-77215" date="12 de abril, 2026" total="$70.00" />
        <BaseDivider class="w-full my-10" />
        <FerryBookingSuccessActions @back="goToSearch" @downloader="handleDownloader" :is-pending="isPending" />
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { useFerryNavigation } from '@/modules/ferry/composables/useFerryNavigation.ts';
import CheckIcon from '@/shared/icons/CheckIcon.vue';
import BaseDivider from '@/shared/components/base/BaseDivider.vue';
import BaseSuccessHeader from '@/shared/components/base/BaseSuccessHeader.vue';
import FerryOrderSummaryCard from '@/modules/ferry/components/FerryOrderSummaryCard.vue';
import FerryBookingSuccessActions from '@/modules/ferry/components/FerryBookingSuccessActions.vue';
import BaseCard from '@/shared/components/base/BaseCard.vue';
import { useDownloadTicket } from '@/modules/ferry/queries/download-ticker.query.ts';
import { useFerryTicketStore } from '@/modules/ferry/stores/ferry-ticket.store.ts';

const ferryTicketStore = useFerryTicketStore();
const { goToSearch } = useFerryNavigation();
const { mutate: downloadTicket, isPending } = useDownloadTicket();

const handleDownloader = () => {
  if (!ferryTicketStore.ticketId) return;

  downloadTicket(ferryTicketStore.ticketId);
};
</script>
