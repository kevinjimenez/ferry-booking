import { useRouter } from 'vue-router';
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';
import { FERRY_ROUTE_NAMES } from '@/modules/ferry/constants';
import { useFerrySelectionStore } from '@/modules/ferry/stores/ferry-selection.store.ts';

export const useFerryNavigation = () => {
  const router = useRouter();
  const storeFerrySearch = useFerrySearchStore();
  const storeFerrySelection = useFerrySelectionStore();

  const goToSearch = () => router.push({ name: FERRY_ROUTE_NAMES.SEARCH });

  const goToOutbound = () =>
    router.push({
      name: FERRY_ROUTE_NAMES.OUTBOUND,
      query: {
        origin: storeFerrySearch.values.origin?.value,
        destination: storeFerrySearch.values.destination?.value,
        outboundDate: storeFerrySearch.values.outboundDate,
      },
    });

  const goToOutboundFare = () =>
    router.push({
      name: FERRY_ROUTE_NAMES.OUTBOUND_FARE,
      query: {
        origin: storeFerrySearch.values.origin?.value,
        destination: storeFerrySearch.values.destination?.value,
        outboundDate: storeFerrySearch.values.outboundDate,
      },
    });

  const goToInbound = () =>
    router.push({
      name: FERRY_ROUTE_NAMES.INBOUND,
      query: {
        origin: storeFerrySearch.values.origin?.value,
        destination: storeFerrySearch.values.destination?.value,
        outboundDate: storeFerrySearch.values.outboundDate,
        inboundDate: storeFerrySearch.values.inboundDate,
      },
    });

  const goToInboundFare = () =>
    router.push({
      name: FERRY_ROUTE_NAMES.INBOUND_FARE,
      query: {
        origin: storeFerrySearch.values.origin?.value,
        destination: storeFerrySearch.values.destination?.value,
        outboundDate: storeFerrySearch.values.outboundDate,
        inboundDate: storeFerrySearch.values.inboundDate,
      },
    });

  const goToTripSummary = () => {
    const outbound = storeFerrySelection.outbound;
    if (!outbound) return goToSearch();

    const inbound = storeFerrySelection.inbound;
    const query: { outbound: string; inbound?: string } = { outbound: outbound.id };
    if (inbound) {
      query.inbound = inbound.id;
    }

    return router.push({
      name: FERRY_ROUTE_NAMES.TRIP_SUMMARY,
      query,
    });
  };

  const goToPassengerDetails = () => router.push({ name: FERRY_ROUTE_NAMES.PASSENGER_DETAILS });

  const goToPayment = () => router.push({ name: FERRY_ROUTE_NAMES.PAYMENT });

  return {
    goToOutbound,
    goToOutboundFare,
    goToInbound,
    goToInboundFare,
    goToSearch,
    goToTripSummary,
    goToPayment,
    goToPassengerDetails,
  };
};
