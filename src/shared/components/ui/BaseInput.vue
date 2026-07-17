<template>
  <div class="w-full block">
    <label class="block text-2xs font-medium">{{ label }}</label>
    <div class="relative">
      <div v-if="prefixIcon" class="absolute inset-y-0 inset-s-0 flex items-center ps-2.5 pointer-events-none">
        <component :is="prefixIcon" :class="iconClass" />
      </div>
      <input :type="type" :min="min" :value="modelValue" :class="[
        'block w-full pe-3 py-2.5 border-gray-300 border text-2xs rounded-sm placeholder:text-body',
        prefixIcon ? 'ps-9' : 'ps-3',
        inputErrorClass,
      ]" :placeholder="placeholder" @input="handleInput" @blur="$emit('blur')" />
    </div>
    <p v-if="helperText && !error" class="label">{{ helperText }}</p>
    <span v-if="error" class="text-secondary text-2xs font-semibold">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import type { BaseInputProps } from '@/shared/components/ui/base-input.types';
import { computed } from 'vue';

const props = withDefaults(defineProps<BaseInputProps>(), {
  type: 'text',
});

const emit = defineEmits(['update:modelValue', 'blur', 'input']);

const inputErrorClass = computed(() => ({
  'border-secondary border text-secondary': props.error,
}));

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement)?.value ?? '';
  emit('update:modelValue', value);
  emit('input', value);
};
</script>
