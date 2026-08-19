import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useGetScheduleQuery } from '@/modules/ferry/queries/get-schedules.query.ts';

export const useScheduleQuery = (dateKey: 'outbound' | 'inbound' = 'outbound') => {
  const route = useRoute();

  const origin = computed(() =>
    dateKey === 'outbound' ? (route.query.origin as string) : (route.query.destination as string),
  );
  const destination = computed(() =>
    dateKey === 'outbound' ? (route.query.destination as string) : (route.query.origin as string),
  );
  const date = computed(() =>
    dateKey === 'outbound'
      ? (route.query.outboundDate as string)
      : (route.query.inboundDate as string),
  );

  const { data, isLoading, error } = useGetScheduleQuery({
    origin: origin.value,
    destination: destination.value,
    date: date.value,
  });

  return { origin, destination, date, data, isLoading, error };
};
