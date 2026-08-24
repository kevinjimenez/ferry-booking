import { createI18n } from 'vue-i18n';
import es from './locales/es';
import en from './locales/en';

export const SUPPORTED_LOCALES = ['es', 'en'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_STORAGE_KEY = 'locale';

export const getInitialLocale = (): Locale => {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  return stored === 'en' ? 'en' : 'es';
};

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getInitialLocale(),
  fallbackLocale: 'es',
  messages: { es, en },
});

export default i18n;
