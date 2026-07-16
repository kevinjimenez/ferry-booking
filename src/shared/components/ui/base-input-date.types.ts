export interface BaseInputDateProps {
  modelValue?: string | null;
  minDate?: Date | string | null;
  maxDate?: Date | string | null;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
}
