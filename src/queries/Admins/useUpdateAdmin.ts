// src/hooks/useUpdateAdmin.ts

import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { CRUAdminPayload } from './types';
import { adminsApi } from '.';

export function useUpdateAdmin(
  options?: UseMutationOptions<
    ApiResponseType<CRUAdminPayload>,
    Error,
    { id: number; data: CRUAdminPayload }
  >,
) {
  const {
    mutate: onUpdateAdmin,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<
    ApiResponseType<CRUAdminPayload>,
    Error,
    { id: number; data: CRUAdminPayload }
  >({
    mutationFn: ({ id, data }) => responseWrapper(adminsApi.updateAdmin, [id, data]), 
    ...options,
  });

  return {
    onUpdateAdmin,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
