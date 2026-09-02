import { env } from '@/config/env';
import axios from 'axios';

const apiServices = axios.create({
  baseURL: env.apiUrl,
});

apiServices.interceptors.response.use(
  response => response,
  async error => {
    const status = error.response?.status;
    let data = error.response?.data;

    // Cuando responseType es 'blob' (descargas), el body de error llega como
    // Blob o como string sin parsear en vez de JSON ya parseado.
    if (data instanceof Blob) {
      try {
        data = JSON.parse(await data.text());
      } catch {
        data = undefined;
      }
    } else if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch {
        // no era JSON, se deja el string tal cual
      }
    }

    // El filtro de excepciones del backend anida el mensaje bajo `error.message`.
    const message = data?.error?.message ?? data?.message ?? error.message;
    return Promise.reject(new Error(`[${status}] ${message}`));
  },
);

export { apiServices };
