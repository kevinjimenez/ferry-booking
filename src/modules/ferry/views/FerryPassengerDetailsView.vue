<template>
  <FerryNavHeader title="Datos del contacto y pasajeros" @back="$router.back()" />
  <h1 class="text-h1">Ferry Passenger Details View</h1>
  <BaseButton @click="goToPayment"> Go to Payment </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/shared/components/base/BaseButton.vue';
import { useFerryNavigation } from '@/modules/ferry/composables/useFerryNavigation.ts';
import FerryNavHeader from '@/modules/ferry/components/FerryNavHeader.vue';

const { goToPayment } = useFerryNavigation();
</script>
