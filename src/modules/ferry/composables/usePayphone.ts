import { onMounted, onUnmounted, watch } from 'vue';
import { loggerServices } from '@/shared/services';
import { PAYPHONE_SCRIPT_URL } from '@/modules/ferry/constants/payphone.constants';
import type { PayphoneConfig } from '@/modules/ferry/types/payphone/payphone-config.types.ts';
import type { PayphoneEmits } from '@/modules/ferry/types/payphone/payphone-emits.types.ts';
import type { PayphoneWindow } from '@/modules/ferry/types/payphone/payphone-window.types.ts';

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

export const usePayphone = (
  getConfig: () => PayphoneConfig,
  emit: PayphoneEmits,
  watchKeys: () => unknown[],
) => {
  // const handleSuccess = (e: Event) =>
  //   emit('payment-success', (e as CustomEvent<Record<string, unknown>>).detail);

  const handleSuccess = (e: Event) => {
    const detail = (e as CustomEvent<Record<string, unknown>>).detail;
    loggerServices.info('Payphone payment success', detail);
    emit('payment-success', detail);
  };

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
};
