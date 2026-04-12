import type { Component } from 'vue';

export interface BaseButtonProps {
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'secondary';
  variant?: 'default' | 'outline' | 'soft';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  circle?: boolean;
  disabled?: boolean;
  prefixIcon?: Component;
  suffixIcon?: Component;
  iconClass?: string;
}
