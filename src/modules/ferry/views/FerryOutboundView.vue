<template>
  <FerryNavHeader title="Elige un ferry de ida" @back="$router.back()" />
  <h1 class="text-h1">Ferry Outbound View</h1>
  <BaseButton @click="goTo"> {{ bottonLabel }} </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/shared/components/base/BaseButton.vue';
import { useFerryNavigation } from '@/modules/ferry/composables/useFerryNavigation.ts';
import FerryNavHeader from '@/modules/ferry/components/FerryNavHeader.vue';
import { useScheduleQuery } from '@/modules/ferry/composables/useScheduleQuery.ts';
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';
import { computed } from 'vue';

const store = useFerrySearchStore();
const {} = useScheduleQuery();
const { goToInbound, goToTripSummary } = useFerryNavigation();

const bottonLabel = computed(() => (store.isRoundTrip ? 'Go to Inbound' : 'Continue'));

const goTo = () => (store.isRoundTrip ? goToInbound() : goToTripSummary());
</script>
