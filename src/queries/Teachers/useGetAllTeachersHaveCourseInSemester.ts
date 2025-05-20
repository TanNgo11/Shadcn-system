import { useState } from 'react';
import { useQuery, UseQueryOptions, useQueryClient } from 'react-query';

import { ApiResponseType, PaginationResponseType, TableParams } from '../helpers';

import { isEmpty } from '@/utils';
import { responseWrapper } from '../helpers';
import { API_TEACHERS_QUERIES } from './keys';
import { TeacherResponse } from './types';
import { teachersApi } from '.';

export function useGetAllTeachesHaveCourseInSemester(
  options?: UseQueryOptions<ApiResponseType<PaginationResponseType<TeacherResponse[]>>, Error> & {
    semesterId?: string | number;
    defaultParams?: TableParams;
  },
) {
  const [params, setParams] = useState<TableParams>(options?.defaultParams || {});
  const {
    data,
    error,
    isFetching,
    isLoading,
    refetch: onGetTeachersHaveCourseInSemester,
  } = useQuery<ApiResponseType<PaginationResponseType<TeacherResponse[]>>, Error>(
    [API_TEACHERS_QUERIES.TEACHER_HAVE_COURSE_IN_SEMESTER, options?.semesterId, params],
    async ({ queryKey }) => {
      const [, semesterId, queryParams] = queryKey as [string | number, string, TableParams];
      return responseWrapper<ApiResponseType<PaginationResponseType<TeacherResponse[]>>>(
        teachersApi.getAllTeachersHaveCourseInSemester,
        [semesterId, queryParams],
      );
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !!options?.semesterId && !isEmpty(params),
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateTeachersList = (params: TableParams) =>
    queryClient.invalidateQueries([
      API_TEACHERS_QUERIES.TEACHER_HAVE_COURSE_IN_SEMESTER,
      options?.semesterId,
      params,
    ]);

  const { result: { totalPages, pageSize, totalElements, data: teachers = [] } = {} } = data || {};

  return {
    totalElements,
    pageSize,
    totalPages,
    teachers,
    error,
    isPending: isFetching || isLoading,
    onGetTeachersHaveCourseInSemester,
    setParams,
    handleInvalidateTeachersList,
  };
}
