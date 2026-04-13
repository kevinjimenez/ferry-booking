<template>
  <FerryNavHeader :title="title" @back="$router.back()" />
  <h1 class="text-h1">Ferry Trip Summary View</h1>
  <BaseButton @click="goToPassengerDetails"> Go to Passengers Details </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/shared/components/base/BaseButton.vue';
import { useFerryNavigation } from '@/modules/ferry/composables/useFerryNavigation.ts';
import FerryNavHeader from '@/modules/ferry/components/FerryNavHeader.vue';
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';
import { computed } from 'vue';

const store = useFerrySearchStore();
const title = computed(() =>
  store.isRoundTrip ? 'Confirma tu viaje — Ida y Vuelta' : 'Confirma tu viaje — Ida',
);
const { goToPassengerDetails } = useFerryNavigation();
</script>
