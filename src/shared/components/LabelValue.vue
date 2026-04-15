<template>
  <div class="flex justify-between">
    <span class="text-md text-text-muted">{{ label }}</span>
    <span class="text-base font-semibold">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string; value: string }>();
</script>
