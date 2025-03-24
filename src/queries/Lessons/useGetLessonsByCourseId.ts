import { isEmpty } from '@/utils';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { LessonResponse, LessonsApis } from '.';
import { ApiResponseType, responseWrapper } from '../helpers';
import { LESSONS_API_KEY } from './keys';

export function useGetLessonsByCourseId(
  options?: UseQueryOptions<ApiResponseType<LessonResponse[]>, Error> & { courseId: string },
) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetLessons,
  } = useQuery<ApiResponseType<LessonResponse[]>, Error>(
    [LESSONS_API_KEY.GET_LESSONS_BY_COURSE_ID, options?.courseId],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<LessonResponse[]>>(
        LessonsApis.getLessonsByCourseId,
        params,
      );
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !isEmpty(options?.courseId),
      ...options,
    },
  );
  const queryClient = useQueryClient();

  const handleInvalidateTagsList = () =>
    queryClient.invalidateQueries([LESSONS_API_KEY.GET_LESSONS_BY_COURSE_ID, options?.courseId]);

  const lessons = data?.result || [];


  return {
    lessons,
    error,
    isFetching,
    onGetLessons,
    handleInvalidateTagsList,
  };
}
