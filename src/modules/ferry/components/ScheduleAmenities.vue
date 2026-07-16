<template>
  <div class="flex w-full items-center gap-x-5">
    <span v-if="showTitle" class="text-2xs text-ink-500 font-bold uppercase">Incluido en el precio:</span>
    <BaseBadge v-for="item in items" :key="item.text" :label="item.text" class="bg-primary/10 border-none"
      icon-class="font-bold size-4 text-primary" :prefix-icon="item.icon"
      label-class="text-primary leading-none text-4xs sm:text-3xs font-semibold" />
  </div>
</template>

<script setup lang="ts">
import BaseBadge from '@/shared/components/ui/BaseBadge.vue';
import type { Component } from 'vue';

withDefaults(defineProps<{
  items: Array<{ icon: Component; text: string }>;
  showTitle?: boolean
}>(), { showTitle: true });
</script>
