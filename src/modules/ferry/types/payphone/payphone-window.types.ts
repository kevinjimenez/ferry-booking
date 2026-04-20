import type { PayphoneConfig } from '@/modules/ferry/types/payphone/payphone-config.types.ts';

export type PayphoneWindow = Window & {
  PPaymentButtonBox: new (config: PayphoneConfig) => { render: (elementId: string) => unknown };
};
