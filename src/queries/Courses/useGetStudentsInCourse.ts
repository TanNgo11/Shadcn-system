import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { ApiResponseType, PaginationResponseType, responseWrapper, TableParams } from '../helpers';
import { StudentResponse } from '../Students/types';
import { useState } from 'react';
import { API_COURSE_QUERIES } from './keys';
import { courseApis } from '.';
import { isEmpty } from '@/utils';

export function useGetStudentsInCourse(
  options: UseQueryOptions<ApiResponseType<PaginationResponseType<StudentResponse[]>>, Error> & {
    defaultParams?: TableParams;
  },
) {
  const [params, setParams] = useState<TableParams>(options?.defaultParams || {});
  const {
    data,
    error,
    isFetching,
    refetch: onGetStudentsInCourse,
  } = useQuery<ApiResponseType<PaginationResponseType<StudentResponse[]>>, Error>(
    [API_COURSE_QUERIES.GET_STUDENTS_IN_COURSE, { ...params }],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<StudentResponse[]>>>(
        courseApis.getAllStudentsInCourse,
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

  const handleInvalidateStudentsList = (params: TableParams) =>
    queryClient.invalidateQueries([API_COURSE_QUERIES.GET_STUDENTS_IN_COURSE, { ...params }]);

  const { result: { totalPages, pageSize, totalElements, data: students = [] } = {} } = data || {};

  return {
    totalElements,
    pageSize,
    totalPages,
    students,
    error,
    isFetching,
    onGetStudentsInCourse,
    setParams,
    handleInvalidateStudentsList,
  };
}
