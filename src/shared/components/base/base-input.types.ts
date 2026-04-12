import type { Component } from 'vue';

export interface BaseInputProps {
  modelValue?: string | number;
  error?: string;
  type?: 'text' | 'number' | 'date';
  min?: string;
  label?: string;
  helperText?: string;
  placeholder?: string;
  prefixIcon?: Component;
  iconClass?: string;
}
