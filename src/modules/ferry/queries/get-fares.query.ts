import { useQuery } from '@tanstack/vue-query';
import { ferryKeys } from '@/modules/ferry/queries/keys/ferry.query-keys';
import { apiServices } from '@/shared/services';
import type { ApiResponse } from '@/shared/types';
import type { FareResponse } from '@/modules/ferry/types/api/responses/fare-response.types.ts';
import { ISLANDS_STALE_TIME } from '@/modules/ferry/constants/ query.constants.ts';

const getFaresQuery = async () => {
  // await new Promise(resolve => setTimeout(resolve, 5000));

  const response = await apiServices.get<ApiResponse<FareResponse[]>>('/fares');

  if (!response.data) throw new Error('Failed to fetch fares');

  const { data } = response.data;

  return data;
};

export const useGetFaresQuery = () => {
  return useQuery({
    queryKey: ferryKeys.fares(),
    queryFn: () => getFaresQuery(),
    staleTime: ISLANDS_STALE_TIME,
  });
};
