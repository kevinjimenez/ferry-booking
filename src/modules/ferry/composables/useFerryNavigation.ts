import { useRouter } from 'vue-router';
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';
import { FERRY_ROUTE_NAMES } from '@/modules/ferry/constants';

export const useFerryNavigation = () => {
  const router = useRouter();
  const store = useFerrySearchStore();

  const goToSearch = () => router.push({ name: FERRY_ROUTE_NAMES.SEARCH });

  const goToOutbound = () =>
    router.push({
      name: FERRY_ROUTE_NAMES.OUTBOUND,
      query: {
        origin: store.values.origin?.value,
        destination: store.values.destination?.value,
        outboundDate: store.values.outboundDate,
      },
    });

  const goToInbound = () =>
    router.push({
      name: FERRY_ROUTE_NAMES.INBOUND,
      query: {
        origin: store.values.origin?.value,
        destination: store.values.destination?.value,
        outboundDate: store.values.outboundDate,
        inboundDate: store.values.inboundDate,
      },
    });
  const goToTripSummary = () => router.push({ name: FERRY_ROUTE_NAMES.TRIP_SUMMARY });
  const goToPassengerDetails = () => router.push({ name: FERRY_ROUTE_NAMES.PASSENGER_DETAILS });
  const goToPayment = () => router.push({ name: FERRY_ROUTE_NAMES.PAYMENT });

  return {
    goToOutbound,
    goToInbound,
    goToSearch,
    goToTripSummary,
    goToPayment,
    goToPassengerDetails,
  };
};
