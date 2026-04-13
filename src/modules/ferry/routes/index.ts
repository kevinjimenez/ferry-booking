import type { RouteRecordRaw } from 'vue-router';
import FerryLayout from '@/modules/ferry/layout/FerryLayout.vue';
import { FERRY_ROUTE_NAMES } from '@/modules/ferry/constants';

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
    {
      path: 'outbound',
      name: FERRY_ROUTE_NAMES.OUTBOUND,
      component: () => import('@/modules/ferry/views/FerryOutboundView.vue'),
      meta: {
        title: 'Salidas del Ferry',
        requiresAuth: false,
      },
    },
    {
      path: 'inbound',
      name: FERRY_ROUTE_NAMES.INBOUND,
      component: () => import('@/modules/ferry/views/FerryInboundView.vue'),
      meta: {
        title: 'Salidas del Ferry',
        requiresAuth: false,
      },
    },
    {
      path: 'trip-summary',
      name: FERRY_ROUTE_NAMES.TRIP_SUMMARY,
      component: () => import('@/modules/ferry/views/FerryTripSummaryView.vue'),
      meta: {
        title: 'Salidas del Ferry',
        requiresAuth: false,
      },
    },
    {
      path: 'passenger-details',
      name: FERRY_ROUTE_NAMES.PASSENGER_DETAILS,
      component: () => import('@/modules/ferry/views/FerryPassengerDetailsView.vue'),
      meta: {
        title: 'Salidas del Ferry',
        requiresAuth: false,
      },
    },
    {
      path: 'payment',
      name: FERRY_ROUTE_NAMES.PAYMENT,
      component: () => import('@/modules/ferry/views/FerryPaymentView.vue'),
      meta: {
        title: 'Salidas del Ferry',
        requiresAuth: false,
      },
    },
    {
      path: 'success',
      name: FERRY_ROUTE_NAMES.BOOKING_SUCCESS,
      component: () => import('@/modules/ferry/views/FerryBookingSuccessView.vue'),
      meta: {
        title: 'Salidas del Ferry',
        requiresAuth: false,
      },
    },
  ],
};
