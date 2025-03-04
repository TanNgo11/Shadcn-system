import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { ApiResponseType, PaginationResponseType, responseWrapper } from "../helpers";
import { SemesterResponse } from "./types";
import { semesterApi } from ".";
import { API_KEY } from "./keys";
import { isEmpty } from "@/utils";

export function useGetCurrentOpenSemester(
    options?: UseQueryOptions<
        ApiResponseType<PaginationResponseType<SemesterResponse>>,
        Error
      >
) {
    const {
      data,
      error,
      isFetching,
      refetch: onGetCurrentOpenSemester,
    } = useQuery<ApiResponseType<SemesterResponse>, Error>(
      [API_KEY.CURRENT_OPEN_SEMESTER, { ...options }],
      async ({ queryKey }) => {
        const [] = queryKey;
        return responseWrapper<ApiResponseType<SemesterResponse>>(semesterApi.getCurrentOpenSemester);
      },
    );
   
     const queryClient = useQueryClient();
   
     const handleInvalidCurrentOpenSemester = () =>
       queryClient.invalidateQueries([API_KEY.CURRENT_OPEN_SEMESTER, { ...options }]);
   
     const { result: semester } = data || {};
   
     return {
       semester,
       error,
       isFetching,
       onGetCurrentOpenSemester,
       handleInvalidCurrentOpenSemester,
     };
}