import { apiServices, loggerServices } from '@/shared/services';
import type { ApiResponse } from '@/shared/types/api.types.ts';
import { useQuery } from '@tanstack/vue-query';
import { ferryKeys } from '@/modules/ferry/queries/keys/ferry.query-keys.ts';
import type { ScheduleResponse } from '@/modules/ferry/types/api/responses/schedule-response.types.ts';
import type { GetSchedulesRequest } from '@/modules/ferry/types/api/requests/get-schedules-request.types.ts';
import { ScheduleMapper } from '@/modules/ferry/mappers/schedule.mapper.ts';
import { ISLANDS_STALE_TIME } from '../constants/ query.constants';

const getSchedulesQuery = async (params: GetSchedulesRequest) => {
  try {
    // await new Promise(resolve => setTimeout(resolve, 5000));
    const { origin, destination, date } = params;
    const response = await apiServices.get<ApiResponse<ScheduleResponse[]>>('/schedules', {
      params: {
        date,
        origin,
        destination,
      },
    });

    if (!response.data) {
      const errorString = `Failed to fetch ports. Status: ${response.status || 'No response data'}`;
      throw new Error(errorString);
    }

    const { data } = response.data;

    return data.map(ScheduleMapper.toFerry);
  } catch (e) {
    const errorString = e instanceof Error ? e.message : 'An unexpected error occurred';
    loggerServices.error('Error in getSchedulesQuery:', errorString);
    throw new Error(errorString);
  }
};

export const useGetScheduleQuery = (params: GetSchedulesRequest) => {
  return useQuery({
    queryKey: ferryKeys.schedules(params),
    queryFn: () => getSchedulesQuery(params),
    staleTime: ISLANDS_STALE_TIME,
  });
};
