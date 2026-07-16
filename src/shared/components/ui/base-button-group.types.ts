export interface BaseButtonGroupProps {
  modelValue: string | number;
  options: ButtonGroupOption[];
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary';
  outline?: boolean;
  disabled?: boolean;
}

export interface ButtonGroupOption {
  value: string | number;
  label: string;
}
