import { useMutation, UseMutationOptions } from 'react-query';
import { buildingApis } from '.';
import { ApiResponseType, responseWrapper } from '../helpers';

export function useDeleteBuilding(
  options?: UseMutationOptions<ApiResponseType<void>, Error, string | number>,
) {
  const { mutate, isLoading, error, data } = useMutation<
    ApiResponseType<void>,
    Error,
    string | number
  >(
    async (id) => {
      return responseWrapper<ApiResponseType<void>>(buildingApis.deleteBuilding, [id]);
    },
    {
      ...options,
    },
  );

  return {
    deleteBuilding: mutate,
    isDeleting: isLoading,
    error,
    data,
  };
}