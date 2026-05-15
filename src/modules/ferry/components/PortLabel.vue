<template>
  <div class="flex flex-col">
    <h4 class="text-h4 font-bold">{{ name }}</h4>
    <small class="text-ink-500 text-2xs font-bold">{{ island }}</small>
  </div>
</template>
<script setup lang="ts">
defineProps<{ name: string; island: string }>();
</script>
