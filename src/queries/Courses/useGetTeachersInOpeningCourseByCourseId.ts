import { TeacherResponse } from '@/containers/Admin/UserManagement/TeacherManagement/CreateEditViewTeacher/helper';
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

export default function useGetteachersInOpeningCourseByCourseId(
  options?: UseQueryOptions<ApiResponseType<PaginationResponseType<TeacherResponse[]>>, Error> & {
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
    refetch: onGetteachersInOpeningCourseByCourse,
  } = useQuery<ApiResponseType<PaginationResponseType<TeacherResponse[]>>, Error>(
    [API_COURSE_QUERIES.TEACHERS_IN_COURSE, { courseId: options?.courseId, ...params }],
    async ({ queryKey }) => {
      const [, params] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<TeacherResponse[]>>>(
        courseApis.getAllTeachersInCourseByCourseId,
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

  const handleInvalidateTeachersList = () => {
    queryClient.invalidateQueries([API_COURSE_QUERIES.TEACHERS_IN_COURSE]);
  };

  const { result: { totalPages, pageSize, totalElements, data: teachers = [] } = {} } = data || {};

  return {
    isSuccess,
    isLoading,
    totalElements,
    pageSize,
    totalPages,
    teachers,
    error,
    isFetching,
    onGetteachersInOpeningCourseByCourse,
    setParams,
    handleInvalidateTeachersList,
    isError,
  };
}
