<template>
  <div class="flex flex-col w-fit">
    <h1 class="text-h1 font-semibold">{{ time }}</h1>
    <p class="text-base font-semibold text-secondary">{{ port }}</p>
    <p class="text-xs font-semibold">{{ island }}</p>
    <small class="text-2xs font-normal text-text-muted">{{ address }}</small>
  </div>
</template>
<script setup lang="ts">
defineProps<{ time: string; port: string;  island: string; address: string }>();
</script>
