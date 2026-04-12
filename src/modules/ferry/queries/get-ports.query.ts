import { apiServices, loggerServices } from '@/shared/services';
import type { ApiResponse } from '@/shared/types/api.types.ts';
import type { PortResponse } from '@/modules/ferry/types';
import { PortMapper } from '@/modules/ferry/mappers/port.mapper.mapper.ts';
import { useQuery } from '@tanstack/vue-query';
import { ferryKeys } from '@/modules/ferry/queries/keys/ferry.query-keys.ts';
import { PORTS_STALE_TIME } from '@/modules/ferry/constants/ query.constants.ts';

const getPortsQuery = async () => {
  try {
    const response = await apiServices.get<ApiResponse<PortResponse[]>>('/ports');

    if (!response.data) {
      const errorString = `Failed to fetch ports. Status: ${response.status || 'No response data'}`;
      throw new Error(errorString);
    }

    const { data } = response.data;

    return data.map(PortMapper.toPortOption);
  } catch (e) {
    const errorString = e instanceof Error ? e.message : 'An unexpected error occurred';
    loggerServices.error('Error in getPortsAction:', errorString);
    throw new Error(errorString);
  }
};

export const useGetPortsQuery = () => {
  return useQuery({
    queryKey: ferryKeys.ports(),
    queryFn: getPortsQuery,
    staleTime: PORTS_STALE_TIME,
  });
};
