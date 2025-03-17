import {
  ApiResponseType,
  GetPropertiesParams,
  PaginationResponseType,
  responseWrapper,
} from '@queries/helpers';
import { useState } from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { registrationApis } from '.';
import { REGISTER_COURSE_API_KEY } from './keys';
import { RegistrationResponse } from './types';

export default function useGetAllRegistrationInSemester(
  options?: UseQueryOptions<
    ApiResponseType<PaginationResponseType<RegistrationResponse[]>>,
    Error
  > & { propertiesParams?: GetPropertiesParams },
) {
  const [params, setParams] = useState<GetPropertiesParams>(options?.propertiesParams || {});

  const {
    error,
    isFetching,
    data,
    refetch: onGetAllRegistrationInSemester,
  } = useQuery<ApiResponseType<PaginationResponseType<RegistrationResponse[]>>, Error>(
    [REGISTER_COURSE_API_KEY.GET_ALL_REGISTRATIONS, params],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<RegistrationResponse[]>>>(
        registrationApis.getAllRegistrationsInSemester,
        params,
      );
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !!params.semesterId,
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateAllRegistrations = () => {
    queryClient.invalidateQueries([REGISTER_COURSE_API_KEY.GET_ALL_REGISTRATIONS, params]);
  };

  const {
    result: { current, totalPages, pageSize, totalElements, data: allRegistrations = [] } = {},
  } = data || {};

  return {
    allRegistrations,
    onGetAllRegistrationInSemester,
    current,
    totalElements,
    pageSize,
    totalPages,
    isFetching,
    error,
    handleInvalidateAllRegistrations,
    setParams,
  };
}
