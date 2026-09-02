// Debe coincidir con MAX_REPORT_RANGE_DAYS del backend (src/reports/constants/report.constants.ts).
export const MAX_REPORT_RANGE_DAYS = 90;

// Solo se listan los estados que el backend realmente asigna hoy a un ticket
// (ver TicketsStatus en schema.prisma): pending es el default al crear,
// confirmed lo setea el listener de pago exitoso, expired lo setea el cron de
// holds vencidos. completed/cancelled/refunded/checked_in existen en el enum
// pero ningún flujo actual los asigna.
export const REPORT_STATUS_OPTIONS = [
  { label: 'Todos', value: 'all' },
  { label: 'Pendiente', value: 'pending' },
  { label: 'Confirmado', value: 'confirmed' },
  { label: 'Expirado', value: 'expired' },
];

// Idem para PaymentStatus: pending es el default al crear el pago, completed
// es lo único que envía el frontend tras un pago exitoso de Payphone.
// processing/failed/refunded/partial_refund existen en el enum pero ningún
// flujo actual los asigna.
export const REPORT_PAYMENT_STATUS_OPTIONS = [
  { label: 'Todos', value: 'all' },
  { label: 'Pendiente', value: 'pending' },
  { label: 'Completado', value: 'completed' },
];
