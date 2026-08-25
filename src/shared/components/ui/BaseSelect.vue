<template>
  <div class="w-full block">
    <label for="countries" class="block text-2xs font-medium">{{ label }}</label>
    <div class="relative">
      <component v-if="prefixIcon" :is="prefixIcon"
        class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" :class="prefixIconClass" />
      <select class="block w-full py-2.5 border-gray-300 border text-heading text-2xs rounded-sm"
        :class="[prefixIcon ? 'pl-7' : 'px-3', inputErrorClass]" :value="modelValue?.value ?? ''" @change="handleChange"
        @blur="$emit('blur')">
        <option value="" disabled>{{ placeholder }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value"
          :disabled="isOptionDisabled(option.value)">
          {{ option.label }}
        </option>
      </select>
    </div>
    <p v-if="helperText && !error" class="label">{{ helperText }}</p>
    <span v-if="error" class="text-secondary text-2xs font-semibold">{{ error }}</span>
  </div>
</template>
<script setup lang="ts">
import { type Component, computed } from 'vue';

export interface SelectOption {
  // id: string;
  label: string;
  value: string | number;
  extra?: string | Record<string, string | number | boolean>;
  disabled?: boolean;
}

export type SelectOptions = Array<SelectOption>;

export interface Props {
  modelValue?: SelectOption | null;
  options: SelectOptions;
  placeholder?: string;
  error?: string;
  helperText?: string;
  label?: string;
  prefixIcon?: Component;
  prefixIconClass?: string;
  disabledValue?: string | number | Array<string | number>;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'seleccione un item',
  prefixIconClass: 'text-heading',
});

const emit = defineEmits(['update:modelValue', 'blur']);

const inputErrorClass = computed(() => ({
  'border-secondary border text-secondary': props.error,
}));

const isOptionDisabled = (value: string | number) =>
  Array.isArray(props.disabledValue) ? props.disabledValue.includes(value) : value === props.disabledValue;

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const selected = props.options.find(option => String(option.value) === target.value);
  emit('update:modelValue', selected);
  // emit('blur');
};
</script>
