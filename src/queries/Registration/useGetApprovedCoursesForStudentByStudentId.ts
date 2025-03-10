import {  useState } from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import {
  ApiResponseType,
  GetPropertiesParams,
  PaginationResponseType,
  responseWrapper,
} from '../helpers';
import { registrationApis } from '.';
import { RegistrationResponse } from './types';
import { isEmpty } from '@/utils';
import { REGISTER_COURSE_API_KEY } from './keys';

export function useGetApprovedCoursesForStudentByStudentId(
  options?: UseQueryOptions<
    ApiResponseType<PaginationResponseType<RegistrationResponse[]>>,
    Error
  > & {
    studentId: string;
    semesterId: string;
    tableParams?: GetPropertiesParams;
  },
) {
  const [tableParams, setTableParams] = useState<GetPropertiesParams>(options?.tableParams || {});

  const {
    data,
    error,
    isFetching,
    refetch: onGetApprovedCoursesForStudentByStudentId,
  } = useQuery<ApiResponseType<PaginationResponseType<RegistrationResponse[]>>, Error>(
    [
      REGISTER_COURSE_API_KEY.GET_APPROVED_COURSES,
      { studentId: options?.studentId, semesterId: options?.semesterId, ...tableParams },
    ],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<RegistrationResponse[]>>>(
        registrationApis.getApprovedCoursesForStudentByStudentId,
        [options?.studentId, options?.semesterId, ...params],
      );
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !isEmpty(tableParams),
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateApprovedCourses = () =>
    queryClient.invalidateQueries([
      REGISTER_COURSE_API_KEY.GET_APPROVED_COURSES,
      { studentId: options?.studentId, semesterId: options?.semesterId, ...tableParams },
    ]);

  const {
    result: { current, totalPages, pageSize, totalElements, data: approvedCourses = [] } = {},
  } = data || {};

  return {
    current,
    totalElements,
    pageSize,
    totalPages,
    approvedCourses,
    isFetching,
    error,
    onGetApprovedCoursesForStudentByStudentId,
    handleInvalidateApprovedCourses,
    setTableParams,
  };
}
