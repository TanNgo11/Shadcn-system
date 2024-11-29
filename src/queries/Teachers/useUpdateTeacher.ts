import { useMutation, UseMutationOptions } from 'react-query';
import { CrudTeacherPayload } from './types';
import { ApiResponseType, responseWrapper } from '../helpers';
import { teachersApi } from '.';

export function useUpdateTeacher(
  // Add the options parameter for the useMutation hook
  // The options parameter is an object that contains the configuration options for the useMutation hook
  options?: UseMutationOptions<
    ApiResponseType<CrudTeacherPayload>,
    Error,
    { id: number; data: CrudTeacherPayload }
  >,
) {
  const {
    mutate: onUpdateTeacher,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<
    ApiResponseType<CrudTeacherPayload>,
    Error,
    { id: number; data: CrudTeacherPayload }
  >({
    // The mutationFn is a function that will be called when the mutation is triggered
    // The function will call the responseWrapper function and pass the teachersApi.updateTeacher function as the first argument
    // The second argument is an array that contains the parameters for the teachersApi.updateTeacher function
    mutationFn: ({ id, data }) => responseWrapper(teachersApi.updateTeacher, [id, data]),
    // The options parameter is spread to the useMutation hook
    ...options,
  });

  return {
    onUpdateTeacher,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
