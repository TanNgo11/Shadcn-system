// src/hooks/useUpdateBlog.ts

import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { blogApis } from '.';
import { BlogsPayload } from './types';

export function useUpdateBlog(
  options?: UseMutationOptions<
    ApiResponseType<BlogsPayload>,
    Error,
    { id: number; data: BlogsPayload }
  >,
) {
  const {
    mutate: onUpdateBlog,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<BlogsPayload>, Error, { id: number; data: BlogsPayload }>({
    mutationFn: ({ id, data }) => responseWrapper(blogApis.updateBlog, [id, data]),
    ...options,
  });

  return {
    onUpdateBlog,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
