import { ferryKeys } from '@/modules/ferry/queries/keys/ferry.query-keys';
import { apiServices } from '@/shared/services';
import type { ApiResponse } from '@/shared/types';
import { useQuery } from '@tanstack/vue-query';
import type { FareExtraResponse } from '../types/api/responses/fare-extra-response.types';
import { FareExtraMapper } from '../mappers/fare-extra.mapper';
import { ISLANDS_STALE_TIME } from '../constants/ query.constants';

const getFareExtrasQuery = async () => {
  // await new Promise(resolve => setTimeout(resolve, 5000));

  const response = await apiServices.get<ApiResponse<FareExtraResponse[]>>('/fare-extras');

  if (!response.data) throw new Error('Failed to fetch fare extras');

  const { data } = response.data;

  return data.map(FareExtraMapper.toFareExtraOption);
};

export const useGetFareExtrasQuery = () => {
  return useQuery({
    queryKey: ferryKeys.fare_extras(),
    queryFn: () => getFareExtrasQuery(),
    staleTime: ISLANDS_STALE_TIME,
  });
};
