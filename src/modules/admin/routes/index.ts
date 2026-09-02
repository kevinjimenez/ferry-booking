import type { RouteRecordRaw } from 'vue-router';

export const adminRoutes: RouteRecordRaw = {
  path: '/admin/reports',
  name: 'admin-reports',
  component: () => import('@/modules/admin/views/AdminReportsView.vue'),
  meta: {
    title: 'Reporte de tickets',
  },
};
