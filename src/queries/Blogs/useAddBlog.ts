import { useMutation, UseMutationOptions, UseQueryOptions } from 'react-query';
import { ApiResponseType, responseWrapper } from '../helpers';
import { BlogsPayload } from './types';
import { BlogApis } from '.';

export function useAddBlog(
  options?: UseMutationOptions<ApiResponseType<any>, Error, BlogsPayload>,
) {
  const {
    mutate: onAddBlog,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<any>, Error, BlogsPayload>({
    mutationFn: (payload: BlogsPayload) => responseWrapper(BlogApis.createBlogs, [payload]),
    ...options,
  });

  return {
    onAddBlog,
    isSuccess,
    isError,
    error,
  };
}
