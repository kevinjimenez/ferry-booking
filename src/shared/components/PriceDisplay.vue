<template>
  <div class="flex flex-col items-center">
    <span class="text-h1"> {{ amount }} </span>
    <span class="text-h6"> {{ currency }} </span>
    <span class="text-base"> {{ label }} </span>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  amount: number;
  currency: string;
  label: string;
}>();
</script>
