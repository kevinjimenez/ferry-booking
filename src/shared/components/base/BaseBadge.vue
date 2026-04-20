<template>
  <div :class="['badge', variantClass, { 'badge-soft': soft }]">
    <component :is="prefixIcon" :class="[iconClass]" />
    <span :class="labelClass">
      {{ label }}
    </span>
    <component :is="suffixIcon" :class="[iconClass]" />
  </div>
</template>
<script setup lang="ts">
import type { Component } from 'vue';

const props = withDefaults(
  defineProps<{
    label: string;
    variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
    iconClass?: string;
    labelClass?: string;
    prefixIcon?: Component;
    suffixIcon?: Component;
    soft?: boolean;
  }>(),
  {
    variant: 'primary',
  },
);

const variantClass = {
  primary: 'badge-primary',
  secondary: 'badge-secondary',
  accent: 'badge-accent',
  info: 'badge-info',
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
}[props.variant];
</script>
