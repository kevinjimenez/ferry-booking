<template>
  <div class="w-full block" :class="{ 'has-error': error }">
    <label v-if="label" class="block text-2xs font-medium">{{ label }}</label>
    <VueDatePicker :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)"
      @blur="emit('blur')" model-type="yyyy-MM-dd" :min-date="minDate ?? undefined" :max-date="maxDate ?? undefined"
      :placeholder="placeholder" :time-config="{ enableTimePicker: false }" format="dd/MM/yyyy" auto-apply
      text-input />
    <p v-if="helperText && !error" class="label">{{ helperText }}</p>
    <span v-if="error" class="text-secondary text-2xs font-semibold">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { VueDatePicker } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import type { BaseInputDateProps } from '@/shared/components/ui/base-input-date.types';

defineProps<BaseInputDateProps>();

const emit = defineEmits(['update:modelValue', 'blur']);
</script>

<style scoped>
:deep(.dp--theme-light) {
  --dp-background-color: var(--color-surface);
  --dp-text-color: var(--color-text-primary);
  --dp-hover-color: var(--color-ink-50);
  --dp-hover-text-color: var(--color-text-primary);
  --dp-hover-icon-color: var(--color-text-secondary);
  --dp-primary-color: var(--color-secondary);
  --dp-primary-text-color: var(--color-text-white);
  --dp-border-color: var(--color-border);
  --dp-menu-border-color: var(--color-border);
  --dp-border-color-hover: var(--color-border-strong);
  --dp-border-color-focus: var(--color-secondary);
  --dp-icon-color: var(--color-text-secondary);
  --dp-border-radius: var(--radius-sm);
  --dp-cell-border-radius: var(--radius-sm);
  --dp-font-family: var(--font-primary);
  --dp-font-size: var(--text-2xs);
  --dp-input-padding: 10px 30px 10px 12px;
}

.has-error :deep(.dp--theme-light) {
  --dp-border-color: var(--color-secondary);
  --dp-border-color-hover: var(--color-secondary);
  --dp-border-color-focus: var(--color-secondary);
  --dp-text-color: var(--color-secondary);
}

:deep(.dp--input::placeholder) {
  color: var(--color-text-muted);
  opacity: 1;
}
</style>
