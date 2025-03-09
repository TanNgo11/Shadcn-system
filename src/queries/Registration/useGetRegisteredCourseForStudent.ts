import { isEmpty } from '@/utils';
import { useState } from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { registrationApis } from '.';
import { ApiResponseType, PaginationResponseType, responseWrapper } from '../helpers';
import { CourseResponse } from '../Semester';
import { GetPropertiesParams } from './../helpers';
import { REGISTER_COURSE_API_KEY } from './keys';

export function useGetRegisteredCourseForStudent(
  options?: UseQueryOptions<ApiResponseType<PaginationResponseType<CourseResponse[]>>, Error> & {
    defaultParams?: GetPropertiesParams;
  },
) {
  const [params, setParams] = useState<GetPropertiesParams>(options?.defaultParams || {});
  const {
    data,
    error,
    isFetching,
    refetch: onGetRegisteredCourseForStudent,
  } = useQuery<ApiResponseType<PaginationResponseType<CourseResponse[]>>, Error>(
    [REGISTER_COURSE_API_KEY.GET_REGISTERED_COURSES, params],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<CourseResponse[]>>>(
        registrationApis.getAllRegisteredCoursesInSemesterByDepartmentForStudent,
        params,
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

  const handleInvalidateRegisteredCourses = () =>
    queryClient.invalidateQueries([REGISTER_COURSE_API_KEY.GET_REGISTERED_COURSES, params]);

  const {
    result: { current, totalPages, pageSize, totalElements, data: registeredCourses = [] } = {},
  } = data || {};

  return {
    current,
    totalElements,
    pageSize,
    totalPages,
    registeredCourses,
    error,
    isFetching,
    setParams,
    handleInvalidateRegisteredCourses,
    onGetRegisteredCourseForStudent,
  };
}
