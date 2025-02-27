import { ApiResponseType } from '@/queries/helpers';
import { useMutation, UseMutationOptions } from 'react-query';
import { responseWrapper } from '../helpers';
import { BaseCourseResponse } from './types';
import { courseApis } from '.';

export default function useCreateBaseCourse(
  options?: UseMutationOptions<ApiResponseType<BaseCourseResponse>, Error, BaseCourseResponse>,
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
