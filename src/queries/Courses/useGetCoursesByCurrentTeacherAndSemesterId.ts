import { isEmpty } from '@/utils';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { courseApis } from '.';
import { ApiResponseType, responseWrapper } from '../helpers';
import { API_COURSE_QUERIES } from './keys';
import { CourseResponse } from './types';

export function useGetCoursesByCurrentTeacherAndSemesterId(
  options: UseQueryOptions<ApiResponseType<CourseResponse[]>, Error> & {
    semesterId: string;
  },
) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetTeachersInCourse,
  } = useQuery<ApiResponseType<CourseResponse[]>, Error>(
    [API_COURSE_QUERIES.GET_COURSES_BY_TEACHER_AND_SEMESTER, options.semesterId],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<CourseResponse[]>>(
        courseApis.getListCoursesOfTeacherBySemesterId,
        params,
      );
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !isEmpty(options.semesterId),
      ...options,
    },
  );
  const queryClient = useQueryClient();

  const handleInvalidateTeachersList = () =>
    queryClient.invalidateQueries([
      API_COURSE_QUERIES.GET_COURSES_BY_TEACHER_AND_SEMESTER,
      options.semesterId,
    ]);

  const { result: courses = [] } = data || {};

  return {
    courses,
    error,
    isFetching,
    onGetTeachersInCourse,
    handleInvalidateTeachersList,
  };
}
