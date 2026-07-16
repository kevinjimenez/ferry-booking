<template>
  <div v-if="label" :class="twMerge('divider', labelColorMap[color ?? 'default'], labelSizeMap[size ?? 'md'], attrs.class as string)">
    <span :class="{ 'font-secondary-italic': italic }">{{ label }}</span>
  </div>
  <hr v-else :class="classes" />
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { twMerge } from 'tailwind-merge';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  size?: 'sm' | 'md' | 'base' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'muted' | 'dark';
  label?: string;
  italic?: boolean;
}>();

const attrs = useAttrs();

const sizeMap: Record<string, string> = {
  sm: 'border-[0.05rem]',
  md: 'border-[0.1rem]',
  base: 'border-[0.15rem]',
  lg: 'border-[0.2rem]',
};

const colorMap: Record<string, string> = {
  default: 'border-gray-200',
  primary: 'border-primary',
  secondary: 'border-secondary',
  muted: 'border-gray-100',
  dark: 'border-gray-400',
};

const labelSizeMap: Record<string, string> = {
  sm: '[&::before]:border-t [&::after]:border-t',
  md: '[&::before]:border-t-2 [&::after]:border-t-2',
  base: '[&::before]:border-t-[3px] [&::after]:border-t-[3px]',
  lg: '[&::before]:border-t-4 [&::after]:border-t-4',
};

const labelColorMap: Record<string, string> = {
  default: '',
  primary: 'text-primary [&::before]:border-primary [&::after]:border-primary',
  secondary: 'text-secondary [&::before]:border-secondary [&::after]:border-secondary',
  muted: 'text-gray-400 [&::before]:border-gray-100 [&::after]:border-gray-100',
  dark: 'text-gray-400 [&::before]:border-gray-400 [&::after]:border-gray-400',
};

const { color, size, label, italic } = props;

const classes = computed(() =>
  twMerge(
    'border-[0.1rem]',
    sizeMap[size ?? 'md'],
    colorMap[color ?? 'default'],
    attrs.class as string,
  ),
);
</script>
