<template>
  <div class="w-full block">
    <label for="countries" class="block mb-2.5 text-sm font-medium text-heading">{{ label }}</label>
    <div class="relative">
      <component
        v-if="prefixIcon"
        :is="prefixIcon"
        class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
        :class="prefixIconClass"
      />
      <select
        class="block w-full py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-sm"
        :class="[prefixIcon ? 'pl-7' : 'px-3', inputErrorClass]"
        @change="handleChange"
        @blur="$emit('blur')"
      >
        <option value="" disabled :selected="!modelValue?.id">{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.id"
          :value="option.id"
          :selected="option.id === modelValue?.id"
          :disabled="option.id === disabledValue"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
    <p v-if="helperText && !error" class="label">{{ helperText }}</p>
    <span v-if="error" class="text-secondary text-input-error font-semibold">{{ error }}</span>
  </div>
</template>
<script setup lang="ts">
import { type Component, computed } from 'vue';

export interface SelectOption {
  id: string;
  label: string;
  value: string | number;
  extra?: string;
  disabled?: boolean;
}

export type SelectOptions = Array<SelectOption>;

export interface Props {
  modelValue?: SelectOption;
  options: SelectOptions;
  placeholder?: string;
  error?: string;
  helperText?: string;
  label?: string;
  prefixIcon?: Component;
  prefixIconClass?: string;
  disabledValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'seleccione un item',
  prefixIconClass: 'text-heading',
});

const emit = defineEmits(['update:modelValue', 'blur']);

const inputErrorClass = computed(() => ({
  'border-secondary border text-secondary': props.error,
}));

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const selected = props.options.find(option => option.id === target.value);
  emit('update:modelValue', selected);
  // emit('blur');
};
</script>
