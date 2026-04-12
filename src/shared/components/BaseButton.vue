<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="['btn shadow-none flex items-center justify-center', buttonClasses]"
    @click="$emit('click')"
  >
    <slot name="prefix" />
    <slot />
    <slot name="suffix" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BaseButtonProps } from '@/shared/components/base-button.types.ts'

const props = withDefaults(defineProps<BaseButtonProps>(), {
  type: 'button',
  color: 'primary',
  variant: 'default',
  size: 'md',
  circle: false,
  disabled: false,
})

defineEmits(['click'])

const buttonClasses = computed(() => {
  const classes = []

  // Circle
  if (props.circle) classes.push('btn-circle')

  // Size (solo si no es circle y no es md)
  if (!props.circle && props.size !== 'md') {
    classes.push(`btn-${props.size}`)
  }

  // Variant
  if (props.variant === 'outline') classes.push('btn-outline')
  if (props.variant === 'soft') classes.push('btn-soft')
  if (props.variant === 'default') classes.push('btn-primary')

  // Color (solo si no es default variant)
  if (props.variant !== 'default') {
    classes.push(`btn-${props.color}`)
  }

  return classes
})
</script>

<style scoped>
.btn:disabled {
  cursor: not-allowed !important;
  pointer-events: auto !important;
}
</style>
