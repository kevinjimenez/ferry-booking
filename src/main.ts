import './assets/main.css';

import { VueQueryPlugin } from '@tanstack/vue-query';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './config/env';
import './config/yup';

import dayjs from 'dayjs';
import 'dayjs/locale/es';
import router from './router';
import App from './App.vue';

dayjs.locale('es');

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
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
