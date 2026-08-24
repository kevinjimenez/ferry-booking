import './assets/main.css';

import { VueQueryPlugin } from '@tanstack/vue-query';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './config/env';
import { setYupLocale } from './config/yup';

import dayjs from 'dayjs';
import 'dayjs/locale/es';
import 'dayjs/locale/en';
import router from './router';
import App from './App.vue';
import i18n, { getInitialLocale } from './i18n';

const initialLocale = getInitialLocale();
dayjs.locale(initialLocale);
setYupLocale(initialLocale);

// Si el navegador tiene un bundle viejo cargado (deploy nuevo en el servidor),
// los chunks lazy-loaded (rutas) ya no existen con ese hash: recargamos la página.
window.addEventListener('vite:preloadError', () => {
  window.location.reload();
});

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minuto por defecto, overrideable por query
      },
    },
  },
});

app.mount('#app');
