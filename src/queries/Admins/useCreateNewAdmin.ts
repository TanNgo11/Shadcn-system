import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { CRUAdminPayload } from './types';
import { adminsApi } from '.';

export function useCreateNewAdmin(
  options?: UseMutationOptions<ApiResponseType<CRUAdminPayload>, Error, CRUAdminPayload>,
) {
  const {
    mutate: onCreateAdmin,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<CRUAdminPayload>, Error, CRUAdminPayload>({
    mutationFn: (payload: CRUAdminPayload) =>
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
