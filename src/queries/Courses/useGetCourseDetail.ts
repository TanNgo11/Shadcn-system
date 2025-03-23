import { isEmpty } from '@/utils';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { courseApis } from '.';
import { ApiResponseType, responseWrapper } from '../helpers';
import { API_COURSE_QUERIES } from './keys';
import { CourseDetailResponse } from './types';

export function useGetCourseDetail(
  options: UseQueryOptions<ApiResponseType<CourseDetailResponse>, Error> & {
    courseId: string;
  },
) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetTeachersInCourse,
  } = useQuery<ApiResponseType<CourseDetailResponse>, Error>(
    [API_COURSE_QUERIES.GET_COURSE_DETAIL, options.courseId],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<CourseDetailResponse>>(
        courseApis.getCourseDetail,
        params,
      );
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      select: (data) => data,
      enabled: !isEmpty(options.courseId),
      ...options,
    },
  );
  const queryClient = useQueryClient();

  const handleInvalidateTeachersList = () =>
    queryClient.invalidateQueries([API_COURSE_QUERIES.GET_COURSE_DETAIL, options.courseId]);

  const { result: courseDetail } = data || {};

  return {
    courseDetail,
    error,
    isFetching,
    onGetTeachersInCourse,
    handleInvalidateTeachersList,
  };
}
