import { isEmpty } from '@/utils';
import { useState } from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { blogApis, BlogsResponse } from '.';
import { API_QUERIES } from '..';
import { ApiResponseType, PaginationResponseType, responseWrapper, TableParams } from '../helpers';

export function useGetAllBlogs(
  options?: UseQueryOptions<ApiResponseType<PaginationResponseType<BlogsResponse[]>>, Error>,
) {
  const [params, setParams] = useState<TableParams>({});
  const {
    data,
    error,
    isFetching,
    refetch: onGetAllBlogs,
  } = useQuery<ApiResponseType<PaginationResponseType<BlogsResponse[]>>, Error>(
    [API_QUERIES.POSTS_LIST, params],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<BlogsResponse[]>>>(
        blogApis.getAllBlogs,
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

  const handleInvalidateBlogsList = () => queryClient.invalidateQueries([API_QUERIES.POSTS_LIST]);

  const { totalPages, pageSize, totalElements, data: blogs = [] } = data?.result || {};

  return {
    totalElements,
    pageSize,
    totalPages,
    blogs,
    error,
    isFetching,
    onGetAllBlogs,
    setParams,
    handleInvalidateBlogsList,
  };
}
