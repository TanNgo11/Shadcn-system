import { useState } from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { buildingApis } from '.';
import { PaginationResponseType, TableParams, ApiResponseType, responseWrapper } from '../helpers';
import { API_BUILDING_QUERIES } from './keys';
import { BuildingResponse } from './types';
import { isEmpty } from '@/utils';

export function useGetAllBuildings(
  options?: UseQueryOptions<
    ApiResponseType<PaginationResponseType<BuildingResponse[]>>,
    Error
  > & {
    tableParams?: TableParams;
  },
) {
  const [params, setParams] = useState<TableParams>(options?.tableParams || {});
  const {
    data,
    error,
    isFetching,
    refetch: onGetAllBuildings,
  } = useQuery<ApiResponseType<PaginationResponseType<BuildingResponse[]>>, Error>(
    [API_BUILDING_QUERIES.GET_ALL_BUILDINGS, { ...params }],

    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<BuildingResponse[]>>>(
        buildingApis.getAllBuildings,
        params,
      );
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !isEmpty(params),
      ...options,
    },
  );
  const queryClient = useQueryClient();

  const handleInvalidateBuildingsList = (params: TableParams) =>
    queryClient.invalidateQueries([API_BUILDING_QUERIES.GET_ALL_BUILDINGS, { ...params }]);

  const { result: { totalPages, pageSize, totalElements, data: buildings = [] } = {} } = data || {};

  return {
    totalElements,
    pageSize,
    totalPages,
    buildings,
    error,
    isFetching,
    onGetAllBuildings,
    setParams,
    handleInvalidateBuildingsList,
  };
}