import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { CreateAdminPayload } from './types';
import { adminsApi } from '.';

export function useCreateNewAdmin(
  options?: UseMutationOptions<ApiResponseType<CreateAdminPayload>, Error, CreateAdminPayload>,
) {
  const {
    mutate: onCreateAdmin,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<CreateAdminPayload>, Error, CreateAdminPayload>({
    mutationFn: (payload: CreateAdminPayload) =>
      responseWrapper(adminsApi.createAdmin, [payload]),
    ...options,
  });

  return {
    onCreateAdmin,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
