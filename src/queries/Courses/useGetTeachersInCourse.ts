import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { ApiResponseType, PaginationResponseType, responseWrapper, TableParams } from '../helpers';
import { useState } from 'react';
import { API_COURSE_QUERIES } from './keys';
import { courseApis } from '.';
import { isEmpty } from '@/utils';
import { TeacherResponse } from '../Teachers/types';

export function useGetTeachersInCourse(
  options: UseQueryOptions<ApiResponseType<PaginationResponseType<TeacherResponse[]>>, Error> & {
    defaultParams?: TableParams;
  },
) {
  const [params, setParams] = useState<TableParams>(options?.defaultParams || {});
  const {
    data,
    error,
    isFetching,
    refetch: onGetTeachersInCourse,
  } = useQuery<ApiResponseType<PaginationResponseType<TeacherResponse[]>>, Error>(
    [
      API_COURSE_QUERIES.GET_TEACHERS_IN_COURSE, // this is used for the query key, it's not taken any effect in the query itself
      { ...params },
    ],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<TeacherResponse[]>>>(
        courseApis.getAllTeachersInCourse,
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

  const handleInvalidateTeachersList = (params: TableParams) =>
    queryClient.invalidateQueries([API_COURSE_QUERIES.GET_TEACHERS_IN_COURSE, { ...params }]);

  const { result: { totalPages, pageSize, totalElements, data: teachers = [] } = {} } = data || {};

  return {
    totalElements,
    pageSize,
    totalPages,
    teachers,
    error,
    isFetching,
    onGetTeachersInCourse,
    setParams,
    handleInvalidateTeachersList,
  };
}
