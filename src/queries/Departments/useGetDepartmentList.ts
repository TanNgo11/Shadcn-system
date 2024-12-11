import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { ApiResponseType, PaginationResponseType, responseWrapper, TableParams } from '../helpers';
import { useState } from 'react';
import { isEmpty } from '@/utils';
import { API_DEPARTMENT } from './keys';
import { DepartmentResponse } from './types';
import { departmentApis } from '.';

export function useGetDepartmentList(
  options?: UseQueryOptions<
    ApiResponseType<PaginationResponseType<DepartmentResponse[]>>,
    Error
  > & {
    defaultParams?: TableParams;
  },
) {
  const [params, setParams] = useState<TableParams>(options?.defaultParams || {});
  const {
    data,
    error,
    isFetching,
    refetch: onGetDepartmentList,
  } = useQuery<ApiResponseType<PaginationResponseType<DepartmentResponse[]>>, Error>(
    [API_DEPARTMENT.DEPARTMENT_LIST, { ...params }],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<DepartmentResponse[]>>>(
        departmentApis.getDepartmentList,
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

  const handleInvalidateDepartmentList = (params?: TableParams) =>
    queryClient.invalidateQueries([API_DEPARTMENT.DEPARTMENT_LIST, { ...params }]);

  const { result: { totalPages, pageSize, totalElements, data: departments = [] } = {} } =
    data || {};

  return {
    totalElements,
    pageSize,
    totalPages,
    departments,
    error,
    isFetching,
    onGetDepartmentList,
    setParams,
    handleInvalidateDepartmentList,
  };
}
