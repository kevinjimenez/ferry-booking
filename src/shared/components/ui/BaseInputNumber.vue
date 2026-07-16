<template>
  <div class="max-w-full">
    <label for="quantity-input" class="block text-2xs font-medium text-heading">{{
      label
      }}</label>
    <div class="relative flex items-center shadow-xs rounded-base">
      <BaseButton circle :prefix-icon="MinusIcon" @click="decrement()" :disabled="modelValue <= min" />
      <span class="text-base font-semibold min-w-8 text-center">{{ modelValue }}</span>
      <BaseButton circle :prefix-icon="PlusIcon" @click="increment()" :disabled="modelValue >= max" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/shared/components/ui/BaseButton.vue';
import MinusIcon from '@/shared/icons/MinusIcon.vue';
import PlusIcon from '@/shared/icons/PlusIcon.vue';

export interface Props {
  modelValue: number;
  label?: string;
  min: number;
  max: number;
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Pasajeros',
});

const emit = defineEmits<{
  'update:modelValue': [value: number];
}>();

const increment = () => {
  if (props.modelValue < props.max) {
    emit('update:modelValue', props.modelValue + 1);
  }
};

const decrement = () => {
  if (props.modelValue > props.min) {
    emit('update:modelValue', props.modelValue - 1);
  }
};
</script>
