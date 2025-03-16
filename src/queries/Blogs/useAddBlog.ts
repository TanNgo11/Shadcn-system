import { useMutation, UseMutationOptions } from 'react-query';
import { blogApis } from '.';
import { ApiResponseType, responseWrapper } from '../helpers';
import { BlogsPayload } from './types';

export function useAddBlog(
  options?: UseMutationOptions<ApiResponseType<any>, Error, BlogsPayload>,
) {
  const {
    mutate: onAddBlog,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<any>, Error, BlogsPayload>({
    mutationFn: (payload: BlogsPayload) => responseWrapper(blogApis.createBlogs, [payload]),
    ...options,
  });

  return {
    onAddBlog,
    isSuccess,
    isError,
    error,
  };
}
