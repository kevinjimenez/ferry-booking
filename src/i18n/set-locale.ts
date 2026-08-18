import dayjs from 'dayjs';
import { setYupLocale } from '@/config/yup';
import i18n, { LOCALE_STORAGE_KEY, type Locale } from '@/i18n';

export const setLocale = (locale: Locale) => {
  i18n.global.locale.value = locale;
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  dayjs.locale(locale);
  setYupLocale(locale);
};
