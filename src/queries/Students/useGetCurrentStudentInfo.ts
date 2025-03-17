import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { studentsApi } from '.';
import { ApiResponseType, responseWrapper } from '../helpers';
import { API_STUDENTS_QUERIES } from './keys';
import { StudentProfileResponse } from './types';

export function useGetCurrentStudentInfo(
  options?: UseQueryOptions<ApiResponseType<StudentProfileResponse>, Error, StudentProfileResponse>,
) {
  const {
    data: student = {} as StudentProfileResponse,
    error,
    isFetching,
    refetch: onGetCurrentStudentInfo,
  } = useQuery<ApiResponseType<StudentProfileResponse>, Error, StudentProfileResponse>(
    [API_STUDENTS_QUERIES.STUDENT_INFO, {}],
    async () => {
      return responseWrapper<ApiResponseType<StudentProfileResponse>>(
        studentsApi.getStudentInfo,
        [],
      );
    },
    {
      select: (data) => data?.result,
      notifyOnChangeProps: ['data', 'isFetching'],
      enabled: true,
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidCurrentStudent = () =>
    queryClient.invalidateQueries([API_STUDENTS_QUERIES.STUDENT_INFO]);

  return {
    student,
    error,
    isFetching,
    onGetCurrentStudentInfo,
    handleInvalidCurrentStudent,
  };
}
