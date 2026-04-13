<template>
  <FerryNavHeader title="Elige un ferry de vuelta" @back="$router.back()" />
  <h1 class="text-h1">Ferry Inbound View</h1>
  <BaseButton @click="goToTripSummary"> Go to Trip Summary </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/shared/components/base/BaseButton.vue';
import { useFerryNavigation } from '@/modules/ferry/composables/useFerryNavigation.ts';
import { useScheduleQuery } from '@/modules/ferry/composables/useScheduleQuery.ts';
import FerryNavHeader from '@/modules/ferry/components/FerryNavHeader.vue';

const {} = useScheduleQuery('inbound');
const { goToTripSummary } = useFerryNavigation();
</script>
