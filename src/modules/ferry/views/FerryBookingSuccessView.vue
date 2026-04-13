<template>
  <h1 class="text-h1">Ferry Inbound View</h1>
  <BaseButton @click="goToInbound"> Go to Inbound </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/shared/components/base/BaseButton.vue';
import { useFerryNavigation } from '@/modules/ferry/composables/useFerryNavigation.ts';

const { goToInbound } = useFerryNavigation();
</script>
