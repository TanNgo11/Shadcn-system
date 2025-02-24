import { ApiResponseType, responseWrapper } from './../helpers';
import { CourseResponse } from '@/containers/Admin/University/DepartmentManagement/ViewCoursesDepartment/helpers';
import { PaginationResponseType, TableParams } from '../helpers';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { TableAction } from 'antd/es/table/interface';
import { useState } from 'react';
import { API_COURSE_QUERIES } from './keys';
import { courseApis } from '.';
import { isEmpty } from '@/utils';
import { BaseCourseResponse } from '@/containers/Admin/Education/CourseManagement/helpers';

export function useGetAllCourse(
  options?: UseQueryOptions<
    ApiResponseType<PaginationResponseType<BaseCourseResponse[]>>,
    Error
  > & {
    tableParams?: TableParams;
  },
) {
  const [params, setParams] = useState<TableParams>(options?.tableParams || {});
  const {
    data,
    error,
    isFetching,
    refetch: onGetAllCourses,
  } = useQuery<ApiResponseType<PaginationResponseType<BaseCourseResponse[]>>, Error>(
    [API_COURSE_QUERIES.GET_COURSE_LIST, { ...params }],

    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<BaseCourseResponse[]>>>(
        courseApis.getAllCourses,
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

  const handleInvalidateCoursesList = (params: TableParams) =>
    queryClient.invalidateQueries([API_COURSE_QUERIES.GET_COURSE_LIST, { ...params }]);

  const { result: { totalPages, pageSize, totalElements, data: courses = [] } = {} } = data || {};

  return {
    totalElements,
    pageSize,
    totalPages,
    courses,
    error,
    isFetching,
    onGetAllCourses,
    setParams,
    handleInvalidateCoursesList,
  };
}
