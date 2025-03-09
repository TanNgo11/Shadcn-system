import { isEmpty } from '@/utils';
import { useState } from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { registrationApis } from '.';
import {
  ApiResponseType,
  GetPropertiesParams,
  PaginationResponseType,
  responseWrapper,
} from '../helpers';
import { CourseResponse } from '../Semester';
import { REGISTER_COURSE_API_KEY } from './keys';

export function useGetUnregisteredCourseForStudent(
  options?: UseQueryOptions<ApiResponseType<PaginationResponseType<CourseResponse[]>>, Error> & {
    defaultParams?: GetPropertiesParams;
  },
) {
  const [params, setParams] = useState<GetPropertiesParams>(options?.defaultParams || {});

  const {
    data,
    error,
    isFetching,
    refetch: onGetUnregisteredCourseForStudent,
  } = useQuery<ApiResponseType<PaginationResponseType<CourseResponse[]>>, Error>(
    [REGISTER_COURSE_API_KEY.GET_UNREGISTERED_COURSES, params],
    async ({ queryKey }) => {
      const [, queryParams] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<CourseResponse[]>>>(
        registrationApis.getAllUnregisteredCoursesInSemesterByDepartmentForStudent,
        [queryParams],
      );
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled:
        !isEmpty(params?.studentId) &&
        !isEmpty(params?.semesterId) &&
        !isEmpty(params?.departmentId),
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateUnregisteredCourses = () =>
    queryClient.invalidateQueries([REGISTER_COURSE_API_KEY.GET_UNREGISTERED_COURSES, params]);

  const {
    result: { current, totalPages, pageSize, totalElements, data: unregisteredCourses = [] } = {},
  } = data || {};

  return {
    current,
    totalElements,
    pageSize,
    totalPages,
    unregisteredCourses,
    error,
    isFetching,
    setParams,
    handleInvalidateUnregisteredCourses,
    onGetUnregisteredCourseForStudent,
  };
}
