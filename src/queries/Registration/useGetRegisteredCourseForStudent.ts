import { TableParams } from './../helpers';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { ApiResponseType, PaginationResponseType, responseWrapper } from '../helpers';
import { GetCoursePropertiesParams } from './types';
import { CourseResponse, semesterApi } from '../Semester';
import { useEffect, useState } from 'react';
import { isEmpty } from '@/utils';
import { REGISTER_COURSE_API_KEY } from './keys';
import { registrationApis } from '.';

export function useGetRegisteredCourseForStudent(
  options?: UseQueryOptions<ApiResponseType<PaginationResponseType<CourseResponse[]>>, Error> & {
    courseParams?: GetCoursePropertiesParams | undefined;
    tableParams?: TableParams;
  },
) {
  // useEffect(() => {
  //   if (options?.courseParams) {
  //     setCourseParams(options.courseParams);
  //   }
  // }, [options?.courseParams]);

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
    refetch: onGetRegisteredCourseForStudent,
  } = useQuery<ApiResponseType<PaginationResponseType<CourseResponse[]>>, Error>(
    [REGISTER_COURSE_API_KEY.GET_REGISTERED_COURSES, { ...courseParams, ...tableParams }],
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
      enabled: !isEmpty(courseParams) && !isEmpty(tableParams),
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateRegisteredCourses = () =>
    queryClient.invalidateQueries([
      REGISTER_COURSE_API_KEY.GET_REGISTERED_COURSES,
      { ...courseParams, ...tableParams },
    ]);

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
    setCourseParams,
    handleInvalidateRegisteredCourses,
    onGetRegisteredCourseForStudent,
  };
}

// REGISTER_COURSE_API_KEY.GET_REGISTERED_COURSES,

