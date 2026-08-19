<template>
  <div class="flex flex-col">
    <h4 class="text-sm sm:text-h6 lg:text-h4 font-bold">{{ name }}</h4>
    <small v-if="pierName" class="hidden sm:flex text-ink-500 text-3xs sm:text-2xs font-bold">{{ pierName }}</small>
    <small v-if="portAddress" class="hidden sm:flex text-ink-500 text-3xs sm:text-2xs">{{ portAddress }}</small>
  </div>
</template>
<script setup lang="ts">
defineProps<{ name: string; pierName?: string; portAddress?: string }>();
</script>
