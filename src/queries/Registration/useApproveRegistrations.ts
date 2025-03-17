import { ApiResponseType, PaginationResponseType, responseWrapper } from '@queries/helpers';
import { useMutation, UseMutationOptions } from 'react-query';
import { registrationApis } from '.';
import { ApproveRegistrationsPayload } from './types';
import { REGISTER_COURSE_API_KEY } from './keys';

export default function useApproveRegistrations(
  options?: UseMutationOptions<ApiResponseType<void>, Error, ApproveRegistrationsPayload>,
) {
  const { mutate: onApproveRegistrations, ...rest } = useMutation<
    ApiResponseType<void>,
    Error,
    ApproveRegistrationsPayload
  >({
    mutationFn: (payload: ApproveRegistrationsPayload) =>
      responseWrapper(registrationApis.approveRegistrations, [payload]),
    meta: {
      invalidates: [REGISTER_COURSE_API_KEY.APPROVE_REGISTRATIONS],
    },
    ...options,
  });

  return {
    onApproveRegistrations,
    ...rest,
  };
}
