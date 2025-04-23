import { useMutation, UseMutationOptions } from 'react-query';
import { buildingApis } from '.';
import { ApiResponseType, responseWrapper } from '../helpers';
import { BuildingCreationRequest } from './types';

export function useCreateBuilding(
  options?: UseMutationOptions<ApiResponseType<void>, Error, BuildingCreationRequest>,
) {
  const { mutate, isLoading, error, data } = useMutation<
    ApiResponseType<void>,
    Error,
    BuildingCreationRequest
  >(
    async (request) => {
      return responseWrapper<ApiResponseType<void>>(buildingApis.createBuilding, [request]);
    },
    {
      ...options,
    },
  );

  return {
    createBuilding: mutate,
    isCreating: isLoading,
    error,
    data,
  };
}