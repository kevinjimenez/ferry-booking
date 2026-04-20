<template>
  <hr :class="classes" />
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { twMerge } from 'tailwind-merge'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  size?: 'sm' | 'md' | 'lg'
  color?: 'default' | 'primary' | 'muted' | 'dark'
}>()

const attrs = useAttrs()

const sizeMap: Record<string, string> = {
  sm: 'border-[0.05rem]',
  md: 'border-[0.1rem]',
  lg: 'border-[0.2rem]',
}

const colorMap: Record<string, string> = {
  default: 'border-gray-200',
  primary: 'border-primary',
  muted:   'border-gray-100',
  dark:    'border-gray-400',
}

const classes = computed(() =>
  twMerge('border-[0.1rem]', sizeMap[props.size ?? 'md'], colorMap[props.color ?? 'default'], attrs.class as string),
)
</script>