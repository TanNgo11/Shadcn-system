import { useMutation, UseMutationOptions } from 'react-query';
import { buildingApis } from '.';
import { ApiResponseType, responseWrapper } from '../helpers';
import { RoomResponse, RoomUpdateRequest } from './types';

interface UpdateRoomParams {
  roomId: string | number;
  request: RoomUpdateRequest;
}

export function useUpdateRoom(
  options?: UseMutationOptions<ApiResponseType<RoomResponse>, Error, UpdateRoomParams>,
) {
  const { mutate, isLoading, error, data } = useMutation<
    ApiResponseType<RoomResponse>,
    Error,
    UpdateRoomParams
  >(
    async ({ roomId, request }) => {
      return responseWrapper<ApiResponseType<RoomResponse>>(buildingApis.updateRoom, [
        roomId,
        request,
      ]);
    },
    {
      ...options,
    },
  );

  return {
    updateRoom: mutate,
    isUpdating: isLoading,
    error,
    data,
  };
}