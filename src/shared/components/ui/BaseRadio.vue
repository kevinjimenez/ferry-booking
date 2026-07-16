<template>
  <div class="flex gap-x-1 justify-center items-center">
    <input type="radio" :id="id" :name="name" :value="value" :checked="modelValue === value"
      @change="$emit('update:modelValue', value)" @blur="$emit('blur')"
      :class="['radio radio-primary radio-xs md:radio-sm', { 'border-secondary': error }]" />
    <label v-if="label" :for="id" class="cursor-pointer text-primary text-label">
      {{ label }}
    </label>
    <span v-if="error" class="text-secondary text-input-error font-semibold">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue';
import type { BaseRadioProps } from './base-radio.types';

withDefaults(defineProps<BaseRadioProps>(), {
  id: () => useId(),
});

defineEmits(['update:modelValue', 'blur']);
</script>

<style scoped />
