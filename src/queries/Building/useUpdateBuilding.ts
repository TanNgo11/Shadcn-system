import { useMutation, UseMutationOptions } from 'react-query';
import { buildingApis } from '.';
import { ApiResponseType, responseWrapper } from '../helpers';
import { BuildingResponse, BuildingUpdateRequest } from './types';

interface UpdateBuildingParams {
  id: string | number;
  request: BuildingUpdateRequest;
}

export function useUpdateBuilding(
  options?: UseMutationOptions<ApiResponseType<BuildingResponse>, Error, UpdateBuildingParams>,
) {
  const { mutate, isLoading, error, data } = useMutation<
    ApiResponseType<BuildingResponse>,
    Error,
    UpdateBuildingParams
  >(
    async ({ id, request }) => {
      return responseWrapper<ApiResponseType<BuildingResponse>>(buildingApis.updateBuilding, [
        id,
        request,
      ]);
    },
    {
      ...options,
    },
  );

  return {
    updateBuilding: mutate,
    isUpdating: isLoading,
    error,
    data,
  };
}