<template>
  <div class="flex items-center gap-1.5">
    <component v-if="prefixIcon" :is="prefixIcon" class="size-5 text-gray-400" />
    <p class="text-gray-400 font-secondary-italic">{{ label }}</p>
    <component v-if="suffixIcon" :is="suffixIcon" class="size-5 text-gray-400" />
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  label: string
  prefixIcon?: Component
  suffixIcon?: Component
}>()
</script>
