import { useMutation, UseMutationOptions } from 'react-query';
import { buildingApis } from '.';
import { ApiResponseType, responseWrapper } from '../helpers';

export function useDeleteRoom(
  options?: UseMutationOptions<ApiResponseType<void>, Error, (string | number)[]>,
) {
  const { mutate, isLoading, error, data } = useMutation<
    ApiResponseType<void>,
    Error,
    (string | number)[]
  >(
    async (roomIds) => {
      return responseWrapper<ApiResponseType<void>>(buildingApis.deleteRoom, [roomIds]);
    },
    {
      ...options,
    },
  );

  return {
    deleteRoom: mutate,
    isDeleting: isLoading,
    error,
    data,
  };
}