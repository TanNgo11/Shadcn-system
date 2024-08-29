import { Auth, LoginPayload } from '@/queries/Auth/types';
import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { authApi } from '.';

export function useLogin(options?: UseMutationOptions<ApiResponseType<Auth>, Error, LoginPayload>) {
  const {
    mutate: onLogin,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<Auth>, Error, LoginPayload>({
    mutationFn: (payload: LoginPayload) => responseWrapper(authApi.authenticate, [payload]),
    ...options,
  });

  return {
    onLogin,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
