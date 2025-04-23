import { useQuery, UseQueryOptions } from 'react-query';
import { buildingApis } from '.';
import { ApiResponseType, responseWrapper } from '../helpers';
import { API_BUILDING_QUERIES } from './keys';
import { RoomResponse } from './types';

export function useGetRoomById(
  roomId: string | number,
  options?: UseQueryOptions<ApiResponseType<RoomResponse>, Error>,
) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetRoomById,
  } = useQuery<ApiResponseType<RoomResponse>, Error>(
    [API_BUILDING_QUERIES.GET_ROOM_BY_ID, roomId],
    async () => {
      return responseWrapper<ApiResponseType<RoomResponse>>(
        buildingApis.getRoomById,
        [roomId],
      );
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      enabled: !!roomId,
      ...options,
    },
  );

  const { result: room } = data || {};

  return {
    room,
    error,
    isFetching,
    onGetRoomById,
  };
}