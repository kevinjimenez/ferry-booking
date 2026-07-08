import type { Component } from 'vue';

export interface BaseButtonProps {
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'secondary';
  variant?: 'default' | 'outline' | 'soft';
  size?: 'xs' | 'sm' | 'md' | 'lg' | (string & {});
  height?: string;
  circle?: boolean;
  disabled?: boolean;
  loading?: boolean;
  prefixIcon?: Component;
  suffixIcon?: Component;
  iconClass?: string;
}
