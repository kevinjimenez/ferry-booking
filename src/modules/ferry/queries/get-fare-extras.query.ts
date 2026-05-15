import { useQuery } from '@tanstack/vue-query';
import { ferryKeys } from '@/modules/ferry/queries/keys/ferry.query-keys';
import { apiServices } from '@/shared/services';
import type { ApiResponse } from '@/shared/types';
import type { FareResponse } from '@/modules/ferry/types/api/responses/fare-response.types.ts';

const getFareExtrasQuery = async () => {
  // await new Promise(resolve => setTimeout(resolve, 5000));

  const response = await apiServices.get<ApiResponse<FareResponse[]>>('/fare-extras');

  if (!response.data) throw new Error('Failed to fetch fare extras');

  const { data } = response.data;

  return data;
};

export const useGetFareExtrasQuery = () => {
  return useQuery({
    queryKey: ferryKeys.fare_extras(),
    queryFn: () => getFareExtrasQuery(),
  });
};
