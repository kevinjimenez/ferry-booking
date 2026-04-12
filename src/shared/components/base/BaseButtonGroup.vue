<template>
  <div class="join">
    <button
      v-for="option in options"
      :key="option.value.toString()"
      type="button"
      class="join-item btn shadow-none"
      :class="buttonClassesMap[option.value]"
      @click="emit('update:modelValue', option.value)"
      :disabled="disabled"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BaseButtonGroupProps } from '@/shared/components/base/base-button-group.types.ts'

const props = withDefaults(defineProps<BaseButtonGroupProps>(), {
  size: 'md',
  color: 'primary',
  outline: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const sizeClass = computed(() => {
  if (props.size === 'md') return ''
  return `btn-${props.size}`
})

const isPrimary = computed(() => props.color === 'primary')
const isSecondary = computed(() => props.color === 'secondary')

const buttonClassesMap = computed(() =>
  Object.fromEntries(props.options.map((option) => [option.value, getButtonClasses(option.value)])),
)

const getButtonClasses = (value: string | number) => {
  const isActive = props.modelValue === value
  return [
    { 'btn-outline': props.outline },
    { 'btn-active': isActive },
    { 'btn-primary': isActive && isPrimary.value },
    { 'hover:btn-primary': !isActive && props.outline && isPrimary.value },
    { 'btn-secondary': isActive && isSecondary.value },
    { 'hover:btn-secondary': !isActive && props.outline && isSecondary.value },
    sizeClass.value,
  ]
}
</script>
