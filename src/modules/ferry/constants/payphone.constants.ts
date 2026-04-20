export const PAYPHONE_SCRIPT_URL = 'https://cdn.payphone.com/payphone-js/latest/pp-button.min.js';

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
