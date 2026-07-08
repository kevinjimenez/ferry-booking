<template>
  <div class="w-full flex flex-col bg-gray-100 rounded-md gap-y-5 p-8">
    <LabelValue label="ID de Orden" :value="orderId" :custom-class="{ label: 'text-md text-text-secondary' }" />
    <BaseDivider />
    <LabelValue label="Fecha" :value="date" :custom-class="{ label: 'text-md text-text-secondary' }" />
    <BaseDivider />
    <LabelValue label="Monto Total" :value="total" :custom-class="{
      label: 'text-lg text-primary font-bold',
      value: 'text-3xl text-primary font-bold',
    }" />
  </div>
</template>

<script setup lang="ts">
import LabelValue from '@/shared/components/LabelValue.vue';
import BaseDivider from '@/shared/components/ui/BaseDivider.vue';

defineProps<{ orderId: string; date: string; total: string }>();
</script>
