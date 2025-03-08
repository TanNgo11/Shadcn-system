import { TableParams } from './../helpers';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { ApiResponseType, PaginationResponseType, responseWrapper } from '../helpers';
import { GetCoursePropertiesParams } from './types';
import { CourseResponse, semesterApi } from '../Semester';
import { useEffect, useState } from 'react';
import { isEmpty } from '@/utils';
import { REGISTER_COURSE_API_KEY } from './keys';
import { registrationApis } from '.';

export function useGetUnregisteredCourseForStudent(
  options?: UseQueryOptions<ApiResponseType<PaginationResponseType<CourseResponse[]>>, Error> & {
    courseParams?: GetCoursePropertiesParams | undefined;
    tableParams?: TableParams;
  },
) {
  const [courseParams, setCourseParams] = useState<GetCoursePropertiesParams>(
    options?.courseParams || {},
  );

  useEffect(() => {
    if (options?.courseParams) {
      setCourseParams(options.courseParams);
    }
  }, [options?.courseParams]);

  const [tableParams, setParams] = useState<TableParams>(options?.tableParams || {});
  const {
    data,
    error,
    isFetching,
    refetch: onGetUnregisteredCourseForStudent,
  } = useQuery<ApiResponseType<PaginationResponseType<CourseResponse[]>>, Error>(
    [REGISTER_COURSE_API_KEY.GET_UNREGISTERED_COURSES, { ...courseParams, ...tableParams }],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<CourseResponse[]>>>(
        registrationApis.getAllUnregisteredCoursesInSemesterByDepartmentForStudent,
        params,
      );
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !isEmpty(courseParams) && !isEmpty(tableParams),
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateUnregisteredCourses = () =>
    queryClient.invalidateQueries([
      REGISTER_COURSE_API_KEY.GET_UNREGISTERED_COURSES,
      { ...courseParams, ...tableParams },
    ]);

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
    setCourseParams,
    handleInvalidateUnregisteredCourses,
    onGetUnregisteredCourseForStudent,
  };
}

