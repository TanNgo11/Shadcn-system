import { isEmpty } from '@/utils';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { blogApis, BlogsResponse } from '.';
import { ApiResponseType, responseWrapper } from '../helpers';
import { API_BLOGS_QUERIES } from './keys';

export function useGetBlogById(
  id: number,
  options?: UseQueryOptions<ApiResponseType<BlogsResponse>, Error>,
) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetBlogById,
  } = useQuery<ApiResponseType<BlogsResponse>, Error>(
    [API_BLOGS_QUERIES.BLOG_BY_ID, { id }],
    () => responseWrapper<ApiResponseType<BlogsResponse>>(blogApis.getBlogById, [id]),
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !isEmpty(id),
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateBlogById = () =>
    queryClient.invalidateQueries([API_BLOGS_QUERIES.BLOG_BY_ID, { id }]);

  const blog = data?.result;

  return {
    blog,
    error,
    isFetching,
    onGetBlogById,
    handleInvalidateBlogById,
  };
}
