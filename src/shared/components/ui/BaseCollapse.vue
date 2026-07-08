<template>
  <div class="collapse border border-base-300 collapse-arrow">
    <input type="checkbox" :checked="defaultOpen" />
    <div class="collapse-title font-semibold flex items-center justify-between">
      <slot name="title" />
    </div>
    <div class="collapse-content text-sm">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ defaultOpen?: boolean }>();
</script>
