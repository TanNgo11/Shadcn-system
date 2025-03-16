import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { fileApi } from '.';

export interface FileUploadResponse {
  downloadUri: string;
}

export function useUploadFile(
  options?: UseMutationOptions<ApiResponseType<FileUploadResponse>, Error, FormData>,
) {
  const {
    mutate: onUploadFile,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<FileUploadResponse>, Error, FormData>({
    mutationFn: (payload: FormData) => responseWrapper(fileApi.uploadFile, [payload]),
    ...options,
  });

  return {
    onUploadFile,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
