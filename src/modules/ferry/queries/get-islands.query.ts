import { ISLANDS_STALE_TIME } from '@/modules/ferry/constants/ query.constants.ts';
import { ferryKeys } from '@/modules/ferry/queries/keys/ferry.query-keys.ts';
import { apiServices, loggerServices } from '@/shared/services';
import type { ApiResponse } from '@/shared/types/api.types.ts';
import { useQuery } from '@tanstack/vue-query';
import { IslandMapper } from '../mappers/island.mapper';
import type { IslandResponse } from '../types/api/responses/island-response.types';

const getIslandsQuery = async () => {
  try {
    // await new Promise(resolve => setTimeout(resolve, 5000));
    const response = await apiServices.get<ApiResponse<IslandResponse[]>>('/islands');

    if (!response.data) {
      const errorString = `Failed to fetch islands. Status: ${response.status || 'No response data'}`;
      throw new Error(errorString);
    }

    const { data } = response.data;

    return data.map(IslandMapper.toIslandOption);
  } catch (e) {
    const errorString = e instanceof Error ? e.message : 'An unexpected error occurred';
    loggerServices.error('Error in getIslandsAction:', errorString);
    throw new Error(errorString);
  }
};

export const useGetIslandsQuery = () => {
  return useQuery({
    queryKey: ferryKeys.islands(),
    queryFn: getIslandsQuery,
    staleTime: ISLANDS_STALE_TIME,
  });
};
