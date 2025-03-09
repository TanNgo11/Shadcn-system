import { ApiResponseType, responseWrapper } from '../helpers';
import { PaginationResponseType, TableParams } from '../helpers';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { useState } from 'react';
import { isEmpty } from '@/utils';
import { TagApis, TagsResponse } from '.';
import { API_QUERIES } from '..';

export function useGetAllTags(
  options?: UseQueryOptions<ApiResponseType<PaginationResponseType<TagsResponse[]>>, Error>,
) {
  const [params, setParams] = useState<TableParams>({});
  const {
    data,
    error,
    isFetching,
    refetch: onGetTags,
  } = useQuery<ApiResponseType<PaginationResponseType<TagsResponse[]>>, Error>(
    [API_QUERIES.TAGS_LIST, params],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<TagsResponse[]>>>(
        TagApis.getTags,
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

  const handleInvalidateTagsList = (params: TableParams) =>
    queryClient.invalidateQueries([API_QUERIES.TAGS_LIST, params]);

  const { totalPages, pageSize, totalElements, data: tags = [] } = data?.result || {};

  return {
    totalElements,
    pageSize,
    totalPages,
    tags,
    error,
    isFetching,
    onGetTags,
    setParams,
    handleInvalidateTagsList,
  };
}
