<template>
  <div class="flex w-full justify-center items-center h-full">
    <div v-if="updatePaymentPending">loading....</div>
    <div v-else class="flex w-full justify-center items-center">
      <BaseCard container-class="w-[50rem] p-0 justify-center items-center gap-y-10">
        <BaseSuccessHeader
          :icon="CheckIcon"
          title="¡Pago Realizado con Éxito!"
          subtitle="Su transacción ha sido procesada correctamente."
        />

        <div class="flex flex-col w-full px-16 pb-10">
          <FerryOrderSummaryCard
            :order-id="success.orderId"
            :date="success.date"
            :total="success.amount"
          />
          <BaseDivider class="w-full my-10" />
          <FerryBookingSuccessActions
            @back="goToSearch"
            @downloader="handleDownloader"
            :is-pending="isPending"
          />
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import CheckIcon from '@/shared/icons/CheckIcon.vue';
import BaseDivider from '@/shared/components/base/BaseDivider.vue';
import BaseSuccessHeader from '@/shared/components/base/BaseSuccessHeader.vue';
import FerryOrderSummaryCard from '@/modules/ferry/components/FerryOrderSummaryCard.vue';
import FerryBookingSuccessActions from '@/modules/ferry/components/FerryBookingSuccessActions.vue';
import BaseCard from '@/shared/components/base/BaseCard.vue';
import { useBookingSuccess } from '@/modules/ferry/composables/useBookingSuccess.ts';

const { isPending, handleDownloader, goToSearch, success, updatePaymentPending } =
  useBookingSuccess();
</script>
