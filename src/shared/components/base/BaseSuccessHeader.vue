<template>
  <div class="w-full flex flex-col gap-y-4 justify-center items-center">
    <BaseAvatar class="size-20">
      <component :is="icon" class="size-10" />
    </BaseAvatar>
    <h3 class="text-h3 font-medium">{{ title }}</h3>
    <small class="text-sm text-text-secondary font-medium font-secondary-italic">
      {{ subtitle }}
    </small>
  </div>
</template>

<script setup lang="ts">
import BaseAvatar from '@/shared/components/base/BaseAvatar.vue';
import type { Component } from 'vue';

defineProps<{ icon: Component; title: string; subtitle: string }>();
</script>
