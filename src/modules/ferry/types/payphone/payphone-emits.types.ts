export type PayphoneEmits = {
  (e: 'payment-success', payload: Record<string, unknown>): void;
  (e: 'payment-error', payload: Record<string, unknown>): void;
  (e: 'payment-cancelled'): void;
};
