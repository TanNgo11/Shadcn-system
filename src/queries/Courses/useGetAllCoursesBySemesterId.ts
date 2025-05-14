import { isEmpty } from '@/utils';
import { CourseResponse } from '@queries/Semester';
import { useState } from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { courseApis } from '.';
import { ApiResponseType, PaginationResponseType, responseWrapper, TableParams } from '../helpers';
import { API_COURSE_QUERIES } from './keys';

export function useGetAllCoursesBySemesterId(
  options?: UseQueryOptions<ApiResponseType<PaginationResponseType<CourseResponse[]>>, Error> & {
    tableParams?: TableParams;
  },
) {
  const [params, setParams] = useState<TableParams>(options?.tableParams || {});
  const {
    data,
    error,
    isFetching,
    refetch: onGetAllCoursesBySemesterId,
  } = useQuery<ApiResponseType<PaginationResponseType<CourseResponse[]>>, Error>(
    [API_COURSE_QUERIES.GET_COURSE_LIST_BY_SEMESTER, { ...params }],

    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<CourseResponse[]>>>(
        courseApis.getAllCoursesBySemesterId,
        params,
      );
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !isEmpty(params?.semesterId),
      ...options,
    },
  );
  const queryClient = useQueryClient();

  const handleInvalidateCoursesListBySemesterId = (params: TableParams) =>
    queryClient.invalidateQueries([API_COURSE_QUERIES.GET_COURSE_LIST_BY_SEMESTER, { ...params }]);

  const { result: { totalPages, pageSize, totalElements, data: courses = [] } = {} } = data || {};

  return {
    totalElements,
    pageSize,
    totalPages,
    courses,
    error,
    isFetching,
    onGetAllCoursesBySemesterId,
    setParams,
    handleInvalidateCoursesListBySemesterId,
  };
}
