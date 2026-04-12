import type { RouteRecordRaw } from 'vue-router'
import FerryLayout from '@/modules/ferry/layout/FerryLayout.vue'
import { FERRY_ROUTE_NAMES } from '@/modules/ferry/constants'

export const ferryRoutes: RouteRecordRaw = {
  // path: '/ferry',
  path: '/',
  name: 'ferry',
  component: FerryLayout,
  children: [
    {
      // path: 'search',
      path: '',
      name: FERRY_ROUTE_NAMES.SEARCH,
      component: () => import('@/modules/ferry/views/FerrySearchView.vue'),
      meta: {
        title: 'Buscar del Ferry',
        requiresAuth: false,
      },
    },
  ],
}
