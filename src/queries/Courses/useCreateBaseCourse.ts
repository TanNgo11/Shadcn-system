import { ApiResponseType } from '@/queries/helpers';
import { useMutation, UseMutationOptions } from 'react-query';
import { responseWrapper } from '../helpers';
import { BaseCoursePayload } from './types';
import { courseApis } from '.';

export default function useCreateBaseCourse(
  options?: UseMutationOptions<ApiResponseType<BaseCoursePayload>, Error, BaseCoursePayload>,
) {
  const { mutate: onCreateBaseCourse, ...rest } = useMutation({
    mutationFn: (payload) => responseWrapper(courseApis.createBaseCourses, [payload]),
    ...options,
  });
  return {
    onCreateBaseCourse,
    ...rest,
  };
}
