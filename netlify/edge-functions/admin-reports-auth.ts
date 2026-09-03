import type { Context } from '@netlify/edge-functions';

// Protege /admin/reports con Basic Auth a nivel de página (dispara el cuadro
// nativo del navegador al navegar a la ruta, no solo al descargar el
// reporte). Credenciales configuradas en Netlify: Site settings > Environment
// variables > ADMIN_REPORTS_USER / ADMIN_REPORTS_PASSWORD.
export default async (request: Request, context: Context) => {
  const user = Netlify.env.get('ADMIN_REPORTS_USER');
  const password = Netlify.env.get('ADMIN_REPORTS_PASSWORD');

  // Si no hay credenciales configuradas en Netlify, no se bloquea la ruta
  // (evita dejar el sitio inaccesible por olvidar configurar las env vars).
  if (!user || !password) {
    return context.next();
  }

  const expectedAuthHeader = `Basic ${btoa(`${user}:${password}`)}`;
  const authHeader = request.headers.get('Authorization');

  if (authHeader !== expectedAuthHeader) {
    return new Response('Autenticación requerida', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Admin Reports"' },
    });
  }

  return context.next();
};
