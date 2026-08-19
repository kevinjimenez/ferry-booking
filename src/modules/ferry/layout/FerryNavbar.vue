<template>
  <header class="bg-white shadow p-4 flex flex-row w-full justify-between items-center">
    <img src="/paradeisos.svg" class="h-12 w-auto" alt="Logo" />
    <div class="flex flex-row gap-10">
      <span class="text-sm font-semibold text-gray-600 cursor-pointer" @click="goHome">
        {{ $t('navbar.home') }}
      </span>
    </div>
    <BaseButtonGroup v-model="selectedLang" :options="LANG_OPTIONS" />
  </header>
</template>

<script setup lang="ts">
import BaseButtonGroup from '@/shared/components/ui/BaseButtonGroup.vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';
import { useFerrySelectionStore } from '@/modules/ferry/stores/ferry-selection.store.ts';
import { useFerryPassengersStore } from '@/modules/ferry/stores/ferry-passengers.store.ts';
import { useFerryPaymentStore } from '@/modules/ferry/stores/ferry-payment.store.ts';
import { useFerryTicketStore } from '@/modules/ferry/stores/ferry-ticket.store.ts';
import { FERRY_ROUTE_NAMES } from '@/modules/ferry/constants/ferry-routes.constants.ts';
import { setLocale } from '@/i18n/set-locale';
import type { Locale } from '@/i18n';

const LANG_OPTIONS = [
  { value: 'es', label: 'ES' },
  { value: 'en', label: 'EN' },
];

const { locale } = useI18n();
const router = useRouter();

const selectedLang = computed<Locale>({
  get: () => locale.value as Locale,
  set: value => setLocale(value),
});

const goHome = () => {
  useFerrySearchStore().reset();
  useFerrySelectionStore().reset();
  useFerryPassengersStore().reset();
  useFerryPaymentStore().reset();
  useFerryTicketStore().reset();
  router.push({ name: FERRY_ROUTE_NAMES.SEARCH });
};
</script>
