<template>
  <div class="flex flex-col w-fit">
    <h1 class="text-h1 font-semibold">{{ time }}</h1>
    <p class="text-md font-semibold">{{ island }}</p>
    <p class="text-xs font-semibold">{{ dock }}</p>
    <small class="text-2xs font-semibold">{{ address }}</small>
  </div>
</template>
<script setup lang="ts">
defineProps<{ time: string; island: string; dock: string; address: string }>();
</script>
