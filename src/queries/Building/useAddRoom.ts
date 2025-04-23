import { useMutation, UseMutationOptions } from 'react-query';
import { buildingApis } from '.';
import { ApiResponseType, responseWrapper } from '../helpers';
import { RoomCreationRequest, RoomResponse } from './types';

interface AddRoomParams {
  buildingId: string | number;
  request: RoomCreationRequest;
}

export function useAddRoom(
  options?: UseMutationOptions<ApiResponseType<RoomResponse>, Error, AddRoomParams>,
) {
  const { mutate, isLoading, error, data } = useMutation<
    ApiResponseType<RoomResponse>,
    Error,
    AddRoomParams
  >(
    async ({ buildingId, request }) => {
      return responseWrapper<ApiResponseType<RoomResponse>>(buildingApis.addRoom, [
        buildingId,
        request,
      ]);
    },
    {
      ...options,
    },
  );

  return {
    addRoom: mutate,
    isAdding: isLoading,
    error,
    data,
  };
}