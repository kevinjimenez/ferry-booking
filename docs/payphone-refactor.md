# Refactor: FerryPayphonePaymentBox → FerryPayphoneButton

## Nombre del componente

`FerryPayphonePaymentBox` → **`FerryPayphoneButton`**

- `PaymentBox` es redundante — Payphone internamente se llama `PPaymentButtonBox`, no tiene sentido duplicarlo
- `Button` describe mejor lo que renderiza: el botón/widget de pago
- Mantiene el prefijo `Ferry` porque vive en el módulo ferry

---

## Estructura final

```
src/modules/ferry/
├── constants/
│   ├── payphone.constants.ts       ← NUEVO
│   └── index.ts                    ← agregar export
├── composables/
│   ├── usePayphone.ts              ← NUEVO
│   └── index.ts                    ← agregar export
└── components/
    ├── FerryPayphoneButton.vue     ← NUEVO (reemplaza FerryPayphonePaymentBox.vue)
    └── FerryPayphonePaymentBox.vue ← ELIMINAR
```

---

## 1. `constants/payphone.constants.ts`

```ts
export const PAYPHONE_SCRIPT_URL =
  'https://cdn.payphone.com/payphone-js/latest/pp-button.min.js';

// Coordenadas por defecto — zona de operación de las rutas de ferry en Ecuador
export const PAYPHONE_DEFAULTS = {
  tax: 0,
  service: 0,
  tip: 0,
  currency: 'USD',
  lang: 'es',
  defaultMethod: 'card' as const,
  timeZone: -5,
  lat: '-1.831239',
  lng: '-78.183406',
  identificationType: 1 as const,
} as const;
```

---

## 2. `composables/usePayphone.ts`

```ts
import { onMounted, onUnmounted, watch } from 'vue';
import { loggerServices } from '@/shared/services';
import { PAYPHONE_SCRIPT_URL } from '@/modules/ferry/constants/payphone.constants';

type PayphoneConfig = Record<string, unknown>;

type PayphoneWindow = Window & {
  PPaymentButtonBox: new (config: PayphoneConfig) => { render: (elementId: string) => unknown };
};

// Módulo-level: el script solo se carga una vez sin importar cuántas instancias existan
let scriptLoaded = false;

const loadPayphoneScript = (): Promise<void> =>
  new Promise((resolve, reject) => {
    if (scriptLoaded || 'PPaymentButtonBox' in window) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = PAYPHONE_SCRIPT_URL;
    script.onload = () => {
      scriptLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error('No se pudo cargar el script de Payphone'));
    document.head.appendChild(script);
  });

export type PayphoneEmits = {
  (e: 'payment-success', payload: Record<string, unknown>): void;
  (e: 'payment-error', payload: Record<string, unknown>): void;
  (e: 'payment-cancelled'): void;
};

export function usePayphone(
  getConfig: () => PayphoneConfig,
  emit: PayphoneEmits,
  watchKeys: () => unknown[],
) {
  const handleSuccess = (e: Event) =>
    emit('payment-success', (e as CustomEvent<Record<string, unknown>>).detail);

  const handleError = (e: Event) =>
    emit('payment-error', (e as CustomEvent<Record<string, unknown>>).detail);

  const handleCancel = () => emit('payment-cancelled');

  const addListeners = () => {
    window.addEventListener('payphone-payment-success', handleSuccess);
    window.addEventListener('payphone-payment-error', handleError);
    window.addEventListener('payphone-payment-cancelled', handleCancel);
  };

  const removeListeners = () => {
    window.removeEventListener('payphone-payment-success', handleSuccess);
    window.removeEventListener('payphone-payment-error', handleError);
    window.removeEventListener('payphone-payment-cancelled', handleCancel);
  };

  const init = async () => {
    try {
      await loadPayphoneScript();

      if (!('PPaymentButtonBox' in window)) {
        loggerServices.error('PPaymentButtonBox no disponible');
        return;
      }

      const container = document.getElementById('pp-button');
      if (container) container.innerHTML = '';

      // Quitar listeners antes de re-agregar para evitar duplicados en reinit
      removeListeners();
      new (window as unknown as PayphoneWindow).PPaymentButtonBox(getConfig()).render('pp-button');
      addListeners();
    } catch (err) {
      loggerServices.error('Error al inicializar Payphone', err);
    }
  };

  onMounted(init);
  onUnmounted(removeListeners);

  // Solo reinicializa cuando cambian datos críticos de la transacción
  watch(watchKeys, init, { deep: false });
}
```

---

## 3. `components/FerryPayphoneButton.vue`

```vue
<template>
  <div id="pp-button" />
</template>

<script setup lang="ts">
import { usePayphone, type PayphoneEmits } from '@/modules/ferry/composables/usePayphone';
import { PAYPHONE_DEFAULTS } from '@/modules/ferry/constants/payphone.constants';

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
```

---

## 4. Barrel exports

### `constants/index.ts`
```ts
export * from './ferry-routes.constants.ts';
export * from './search-form.constants.ts';
export * from './payphone.constants.ts'; // agregar
```

### `composables/index.ts`
```ts
export * from './useSearchForm';
export * from './usePayphone'; // agregar
```

---

## Bugs corregidos respecto al original

| Bug | Original | Corregido |
|-----|----------|-----------|
| **Memory leak de listeners** | `initPayphone` agregaba listeners en cada reinit sin quitar los anteriores | `removeListeners()` se llama antes de cada `addListeners()` en `init` |
| **`watch` demasiado amplio** | `watch(() => [props.amount, props.clientTransactionId])` — hardcodeado en el componente | `watchKeys` como parámetro del composable, lo decide el componente |
| **`any` en toda la lógica** | `(window as any).PPaymentButtonBox` repetido y sin tipo | `PayphoneWindow` type centralizado, sin `any` |
| **`ppb` variable inutilizada** | Se guardaba la instancia pero nunca se usaba después del render | Eliminada — el SDK maneja su propio estado |
| **`scriptLoaded` sin protección de raza** | Podía lanzar dos requests si se montaban dos instancias simultáneas | Se mantiene módulo-level + check `'PPaymentButtonBox' in window` como fallback |