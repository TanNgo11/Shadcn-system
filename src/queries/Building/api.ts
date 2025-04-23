import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import { API_URLS } from '../keys';
import { TableParams } from '@queries';
import { stringify } from '@/utils';
import { BuildingCreationRequest, BuildingUpdateRequest } from './types';

const useApis = (baseUrl = API_URLS.COURSE) => {
  const privateApi = useHttpPrivateRequest(baseUrl);

  const getAllBuildings = (params: TableParams) => {
    return privateApi.get(`/api/v1/buildings?${stringify(params)}`);
  };

  const getBuildingById = (id: string | number) => {
    return privateApi.get(`/api/v1/buildings/${id}`);
  };

  const createBuilding = (request: BuildingCreationRequest) => {
    return privateApi.post('/api/v1/buildings', request);
  };

  const updateBuilding = (id: string | number, request: BuildingUpdateRequest) => {
    return privateApi.put(`/api/v1/buildings/${id}`, request);
  };

  const deleteBuilding = (id: string | number) => {
    return privateApi.delete(`/api/v1/buildings/${id}`);
  };

  const getListRoomByBuilding = (buildingId: string | number, params: TableParams) => {
    return privateApi.get(`/api/v1/buildings/${buildingId}/rooms?${stringify(params)}`);
  };

  const getRoomById = (roomId: string | number) => {
    return privateApi.get(`/api/v1/buildings/rooms/${roomId}`);
  };

  const addRoom = (buildingId: string | number, request: any) => {
    return privateApi.post(`/api/v1/buildings/${buildingId}/rooms`, request);
  };

  const updateRoom = (roomId: string | number, request: any) => {
    return privateApi.put(`/api/v1/buildings/rooms/${roomId}`, request);
  };

  const deleteRoom = (roomIds: (string | number)[]) => {
    return privateApi.delete('/api/v1/buildings/rooms', { data: roomIds });
  };

  return {
    getAllBuildings,
    getBuildingById,
    createBuilding,
    updateBuilding,
    deleteBuilding,
    getListRoomByBuilding,
    getRoomById,
    addRoom,
    updateRoom,
    deleteRoom,
  };
};

export default useApis;