<template>
  <header class="bg-white shadow p-4 flex flex-row w-full justify-between items-center">
    <img src="/paradeisos.svg" class="h-12 w-auto" alt="Logo" />
    <div class="flex flex-row gap-10">
      <span v-for="lang in ['INICIO']" :key="lang" class="text-sm font-semibold text-gray-600 cursor-pointer"
        @click="goHome">
        {{ lang }}
      </span>
    </div>
    <BaseButtonGroup v-model="selectedLang" :options="[{ value: 'ES', label: 'ES' }]" />
  </header>
</template>

<script setup lang="ts">
import BaseButtonGroup from '@/shared/components/ui/BaseButtonGroup.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';
import { useFerrySelectionStore } from '@/modules/ferry/stores/ferry-selection.store.ts';
import { useFerryPassengersStore } from '@/modules/ferry/stores/ferry-passengers.store.ts';
import { useFerryPaymentStore } from '@/modules/ferry/stores/ferry-payment.store.ts';
import { useFerryTicketStore } from '@/modules/ferry/stores/ferry-ticket.store.ts';
import { FERRY_ROUTE_NAMES } from '@/modules/ferry/constants/ferry-routes.constants.ts';

const selectedLang = ref('ES');
const router = useRouter();

const goHome = () => {
  useFerrySearchStore().reset();
  useFerrySelectionStore().reset();
  useFerryPassengersStore().reset();
  useFerryPaymentStore().reset();
  useFerryTicketStore().reset();
  router.push({ name: FERRY_ROUTE_NAMES.SEARCH });
};
</script>
