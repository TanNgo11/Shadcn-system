import { UseMutationOptions } from 'react-query';
import { ApiResponseType, responseWrapper } from '../helpers';
import { useMutation } from 'react-query';
import { teachersApi } from '.';

export function useDeleteTeacherByUsernames(
  // This Mutation hook will delete a teacher by id
  // options here is used to pass the configuration options for the useMutation hook
  options?: UseMutationOptions<ApiResponseType<any>, Error, string[]>,
) {
  // The useMutation hook is called with the configuration options

  const {
    mutate: onDeleteTeacherByUsernames,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<any>, Error, string[]>({
    // The mutationFn is a function that will be called when the mutation is triggered
    // This function will call the deleteTeacher function from the teachersApi and pass the id parameter as an argument
    mutationFn: (payload: string[]) =>
      responseWrapper(teachersApi.deleteTeacherByUsernames, [payload]),

    // The options parameter is spread to the useMutation hook
    ...options,
  });

  return {
    onDeleteTeacherByUsernames,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
