import {
  ApiResponseType,
  PaginationResponseType,
  responseWrapper,
  TableParams,
} from '@queries/helpers';
import { useState } from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { API_COURSE_QUERIES } from './keys';
import { courseApis } from '.';
import { StudentResponse } from '@queries/Registration/types';

export default function useGetStudentInOpeningCourseByCourseId(
  options?: UseQueryOptions<ApiResponseType<PaginationResponseType<StudentResponse[]>>, Error> & {
    courseId: string;
    defaultParams?: TableParams;
  },
) {
  const [params, setParams] = useState<TableParams>(options?.defaultParams || {});

  const {
    isLoading,
    isError,
    error,
    isFetching,
    isSuccess,
    data,
    refetch: onGetStudentsInOpeningCourseByCourseId,
  } = useQuery<ApiResponseType<PaginationResponseType<StudentResponse[]>>, Error>(
    [API_COURSE_QUERIES.STUDENTS_IN_COURSE, { courseId: options?.courseId, ...params }],
    async ({ queryKey }) => {
      const [, params] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<StudentResponse[]>>>(
        courseApis.getAllStudentsInCourseByCourseId,
        [options?.courseId, params],
      );
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !!options?.courseId,
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateStudentsList = () => {
    queryClient.invalidateQueries([API_COURSE_QUERIES.STUDENTS_IN_COURSE]);
  };

  const { result: { totalPages, pageSize, totalElements, data: students = [] } = {} } = data || {};

  return {
    isSuccess,
    isLoading,
    totalElements,
    pageSize,
    totalPages,
    students,
    error,
    isFetching,
    onGetStudentsInOpeningCourseByCourseId,
    setParams,
    handleInvalidateStudentsList,
    isError,
  };
}
