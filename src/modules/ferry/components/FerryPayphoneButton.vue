<template>
  <div id="pp-button" class="w-full" />
</template>

<script setup lang="ts">
import { usePayphone } from '@/modules/ferry/composables/usePayphone';
import { PAYPHONE_DEFAULTS } from '@/modules/ferry/constants/payphone.constants';
import type { PayphoneEmits } from '@/modules/ferry/types/payphone/payphone-emits.types.ts';

interface Props {
  token: string;
  storeId: string;
  clientTransactionId: string;
  amount: number;
  amountWithoutTax: number;
  amountWithTax: number;
  tax?: number;
  service?: number;
  tip?: number;
  currency?: string;
  reference: string;
  lang?: string;
  defaultMethod?: 'card' | 'payphone';
  timeZone?: number;
  lat?: string;
  lng?: string;
  optionalParameter?: string;
  phoneNumber?: string;
  email?: string;
  documentId?: string;
  identificationType?: 1 | 2 | 3;
}

const props = withDefaults(defineProps<Props>(), PAYPHONE_DEFAULTS);

const emit = defineEmits<PayphoneEmits>();

usePayphone(
  () => ({
    token: props.token,
    storeId: props.storeId,
    clientTransactionId: props.clientTransactionId,
    amount: props.amount,
    amountWithoutTax: props.amountWithoutTax,
    amountWithTax: props.amountWithTax,
    tax: props.tax,
    service: props.service,
    tip: props.tip,
    currency: props.currency,
    reference: props.reference,
    lang: props.lang,
    defaultMethod: props.defaultMethod,
    timeZone: props.timeZone,
    lat: props.lat,
    lng: props.lng,
    ...(props.optionalParameter && { optionalParameter: props.optionalParameter }),
    ...(props.phoneNumber && { phoneNumber: props.phoneNumber }),
    ...(props.email && { email: props.email }),
    ...(props.documentId && { documentId: props.documentId }),
    ...(props.identificationType && { identificationType: props.identificationType }),
  }),
  emit,
  () => [props.amount, props.clientTransactionId],
);
</script>

<style scoped>
/* ── Layout base ─────────────────────────────── */
#pp-button :deep(button) {
  border-radius: var(--radius-md);
  width: 100%;
}

#pp-button :deep(.pp-card) {
  box-shadow: none;
}

/* ── Contenedor principal ─────────────────────── */
#pp-button :deep(.ppb-content) {
  background: none;
  width: 100%;
  display: block;
  justify-content: unset;
  align-items: unset;
  font-family: var(--font-primary) !important;
  font-size: inherit;
  color: var(--color-primary);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
}

#pp-button :deep(.ppb-body) {
  width: 100%;
}

#pp-button :deep(.payment-box) {
  background: none;
  width: 100%;
}

/* ── Párrafos de mensaje ─────────────────────── */
#pp-button :deep(.ppb-p.message.ppb-mb-0),
#pp-button :deep(.ppb-p.message.ppb-mb-2) {
  color: var(--color-text-secondary) !important;
  font-weight: 600 !important;
  font-size: var(--text-base) !important;
}

/* ── Tipografía de textos internos ───────────── */
#pp-button :deep(.ppb-loading .info),
#pp-button :deep(.ppb-loading .info-open-app) {
  font-family: var(--font-primary) !important;
  color: var(--color-text-secondary) !important;
}

#pp-button :deep(p.message-paypment-box),
#pp-button :deep(.ppb-text-reference),
#pp-button :deep(.ppb-text-header) {
  font-family: var(--font-primary) !important;
  color: var(--color-text-secondary) !important;
}

/* ── Títulos h4 uppercase ────────────────────── */
#pp-button :deep(.ppb-h4.ppb-text-uppercase) {
  color: var(--color-primary) !important;
  font-weight: 700 !important;
}

/* ── Montos (accent rojo de la app) ──────────── */
#pp-button :deep(.ppb-h4.ppb-text-amount-h4) {
  color: var(--color-secondary) !important;
  font-size: var(--text-h5) !important;
  font-weight: 700 !important;
}

/* ── Border-radius uniformes ─────────────────── */
#pp-button :deep(.ppb-border-radius) { border-radius: var(--radius-md) !important; }
#pp-button :deep(.ppb-border-radius-te) { border-top-right-radius: var(--radius-md) !important; }
#pp-button :deep(.ppb-border-radius-be) { border-bottom-right-radius: var(--radius-md) !important; }
#pp-button :deep(.ppb-border-radius-ts) { border-top-left-radius: var(--radius-md) !important; }
#pp-button :deep(.ppb-border-radius-bs) { border-bottom-left-radius: var(--radius-md) !important; }

/* ── Botones de método de pago ───────────────── */
#pp-button :deep(.ppb-btn-control:hover),
#pp-button :deep(.select-btn) {
  background-color: var(--color-base-200) !important;
  border-color: var(--color-primary) !important;
}

/* ── Selector de bandera / código de país ────── */
#pp-button :deep(.selected-flag) {
  background-color: var(--color-primary) !important;
  color: var(--color-primary-content) !important;
  border-top-left-radius: var(--radius-md) !important;
  border-bottom-left-radius: var(--radius-md) !important;
}

/* ── Botón principal de pago ─────────────────── */
#pp-button :deep(.ppb-btn-pay) {
  background-color: var(--color-secondary) !important;
  color: var(--color-secondary-content) !important;
  border-radius: var(--radius-md) !important;
  font-family: var(--font-primary), sans-serif !important;
  font-size: var(--text-base) !important;
  font-weight: 600 !important;
  letter-spacing: normal !important;
  height: 48px !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

/* ── Mensaje de error ────────────────────────── */
#pp-button :deep(.ppb-error-message) {
  border-color: var(--color-info) !important;
  border-radius: var(--radius-lg) !important;
}

#pp-button :deep(.ppb-error-message h2) {
  color: var(--color-error) !important;
  font-family: var(--font-primary) !important;
}

/* ── OTP ─────────────────────────────────────── */
#pp-button :deep(.ppb-otp-message label),
#pp-button :deep(.ppb-otp-message a) {
  color: var(--color-primary) !important;
  font-family: var(--font-primary) !important;
}

/* ── Etiqueta efectivo ───────────────────────── */
#pp-button :deep(#cash-btn-label) {
  color: var(--color-primary) !important;
  font-family: var(--font-primary) !important;
}

/* ── Disclaimer split ────────────────────────── */
#pp-button :deep(.ppb-disclaimer-split) {
  background-color: color-mix(in srgb, var(--color-primary) 7%, transparent) !important;
  color: var(--color-neutral) !important;
}
</style>
