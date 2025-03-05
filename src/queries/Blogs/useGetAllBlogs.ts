import { ApiResponseType, responseWrapper } from '../helpers';
import { PaginationResponseType, TableParams } from '../helpers';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { useState } from 'react';
import { isEmpty } from '@/utils';
import { API_BLOG_QUERIES } from './keys';
import { BlogApis, BlogsResponse } from '.';

export function useGetAllBlogs(
  options?: UseQueryOptions<ApiResponseType<PaginationResponseType<BlogsResponse[]>>, Error>,
) {
  const [params, setParams] = useState<TableParams>({});
  const {
    data,
    error,
    isFetching,
    refetch: onGetAllBlogss,
  } = useQuery<ApiResponseType<PaginationResponseType<BlogsResponse[]>>, Error>(
    [API_BLOG_QUERIES.POSTS_LIST, params],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<BlogsResponse[]>>>(
        BlogApis.getAllBlogs,
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

  const handleInvalidateBlogssList = (params: TableParams) =>
    queryClient.invalidateQueries([API_BLOG_QUERIES.POSTS_LIST, params]);

  const { totalPages, pageSize, totalElements, data: blogs = [] } = data?.result || {};

  return {
    totalElements,
    pageSize,
    totalPages,
    blogs,
    error,
    isFetching,
    onGetAllBlogss,
    setParams,
    handleInvalidateBlogssList,
  };
}
