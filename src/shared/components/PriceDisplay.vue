<template>
  <div class="flex flex-col items-center my-1 w-full">
    <span class="text-[30px] font-extrabold text-secondary"> {{ formatCurrency(amount) }} </span>
    <span class="text-3xs text-ink-500"> {{ label}} </span>
  </div>
</template>
<script setup lang="ts">
import { formatCurrency } from '@/shared/utils/currency.utils.ts';
import { computed } from 'vue';

const props = defineProps<{
  amount: number;
  currency: string;
  seats: number;
}>();

const label = computed(() => `${props.currency} por persona`);
</script>
