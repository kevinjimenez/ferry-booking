<template>
  <FerryNavHeader title="Pago" @back="$router.back()" />
  <h1 class="text-h1">Ferry Inbound View</h1>
  <BaseButton @click="goToSearch"> de regreso a buscar </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/shared/components/base/BaseButton.vue';
import { useFerryNavigation } from '@/modules/ferry/composables/useFerryNavigation.ts';
import FerryNavHeader from '@/modules/ferry/components/FerryNavHeader.vue';

const { goToSearch } = useFerryNavigation();
</script>
