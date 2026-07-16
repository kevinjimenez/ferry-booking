<template>
  <div class="flex gap-x-2 items-center">
    <input type="checkbox" :id="id" :checked="modelValue" @change="handleChange" @blur="$emit('blur')"
      :class="twMerge('checkbox checkbox-primary checkbox-xs md:checkbox-sm', error ? 'border-secondary' : '', props.class)" />
    <label v-if="label" :for="id" :class="twMerge('cursor-pointer text-primary text-label', props.labelClass)">
      {{ label }}
    </label>
    <span v-if="error" class="text-secondary text-input-error font-semibold">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue';
import { twMerge } from 'tailwind-merge';
import type { BaseCheckboxProps } from './base-checkbox.types';

const props = withDefaults(defineProps<BaseCheckboxProps>(), {
  id: () => useId(),
});

const emit = defineEmits(['update:modelValue', 'blur']);

const handleChange = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).checked);
};
</script>

<style scoped />
