import { useQuery, UseQueryOptions } from 'react-query';
import { buildingApis } from '.';
import { ApiResponseType, responseWrapper } from '../helpers';
import { API_BUILDING_QUERIES } from './keys';
import { BuildingResponse } from './types';

export function useGetBuildingById(
  id: string | number,
  options?: UseQueryOptions<ApiResponseType<BuildingResponse>, Error>,
) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetBuildingById,
  } = useQuery<ApiResponseType<BuildingResponse>, Error>(
    [API_BUILDING_QUERIES.GET_BUILDING_BY_ID, id],
    async () => {
      return responseWrapper<ApiResponseType<BuildingResponse>>(
        buildingApis.getBuildingById,
        [id],
      );
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      enabled: !!id,
      ...options,
    },
  );

  const { result: building } = data || {};

  return {
    building,
    error,
    isFetching,
    onGetBuildingById,
  };
}