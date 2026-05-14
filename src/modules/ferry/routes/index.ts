import type { RouteRecordRaw } from 'vue-router';
import FerryLayout from '@/modules/ferry/layout/FerryLayout.vue';
import { FERRY_ROUTE_NAMES } from '@/modules/ferry/constants';
import {
  inboundGuard,
  outboundGuard,
  passengerDetailsGuard,
  paymentGuard,
  successGuard,
  tripSummaryGuard,
} from '@/modules/ferry/guards';
import { removeAllAppStorage } from '@/shared/utils/storage.utils.ts';
import { StorageEnum } from '@/shared/enums';

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
      beforeEnter: () => {
        removeAllAppStorage(StorageEnum.SESSION);
      },
      meta: {
        title: 'Buscar del Ferry',
        requiresAuth: false,
      },
    },
    {
      path: 'outbound',
      name: FERRY_ROUTE_NAMES.OUTBOUND,
      component: () => import('@/modules/ferry/views/FerryOutboundView.vue'),
      beforeEnter: outboundGuard,
      meta: {
        title: 'Salidas del Ferry',
        requiresAuth: false,
      },
    },
    {
      path: 'outbound-fare',
      name: FERRY_ROUTE_NAMES.OUTBOUND_FARE,
      component: () => import('@/modules/ferry/views/FerryFareView.vue'),
      // beforeEnter: outboundGuard,
      meta: {
        title: 'Tarifa de ida',
        requiresAuth: false,
        direction: 'outbound',
      },
    },
    {
      path: 'inbound',
      name: FERRY_ROUTE_NAMES.INBOUND,
      component: () => import('@/modules/ferry/views/FerryInboundView.vue'),
      beforeEnter: inboundGuard,
      meta: {
        title: 'Salidas del Ferry',
        requiresAuth: false,
      },
    },
    {
      path: 'inbound-fare',
      name: FERRY_ROUTE_NAMES.INBOUND_FARE,
      component: () => import('@/modules/ferry/views/FerryFareView.vue'),
      // beforeEnter: inboundGuard,
      meta: {
        title: 'Tarifa de vuelta',
        requiresAuth: false,
        direction: 'inbound',
      },
    },
    {
      path: 'trip-summary',
      name: FERRY_ROUTE_NAMES.TRIP_SUMMARY,
      component: () => import('@/modules/ferry/views/FerryTripSummaryView.vue'),
      beforeEnter: tripSummaryGuard,
      meta: {
        title: 'Salidas del Ferry',
        requiresAuth: false,
      },
    },
    {
      path: 'passenger-details',
      name: FERRY_ROUTE_NAMES.PASSENGER_DETAILS,
      component: () => import('@/modules/ferry/views/FerryPassengerDetailsView.vue'),
      beforeEnter: passengerDetailsGuard,
      meta: {
        title: 'Salidas del Ferry',
        requiresAuth: false,
      },
    },
    {
      path: 'payment',
      name: FERRY_ROUTE_NAMES.PAYMENT,
      component: () => import('@/modules/ferry/views/FerryPaymentView.vue'),
      beforeEnter: paymentGuard,
      meta: {
        title: 'Salidas del Ferry',
        requiresAuth: false,
      },
    },
    {
      path: 'success',
      name: FERRY_ROUTE_NAMES.BOOKING_SUCCESS,
      component: () => import('@/modules/ferry/views/FerryBookingSuccessView.vue'),
      beforeEnter: successGuard,
      meta: {
        title: 'Salidas del Ferry',
        requiresAuth: false,
      },
    },
  ],
};
