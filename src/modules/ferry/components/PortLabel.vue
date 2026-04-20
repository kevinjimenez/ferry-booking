<template>
  <div class="flex flex-col">
    <h6 class="text-md font-medium">{{name}}</h6>
    <small class="text-text-muted text-2xs">{{ island}}</small>
  </div>
</template>
<script setup lang="ts">
defineProps<{ name: string; island: string }>();
</script>
