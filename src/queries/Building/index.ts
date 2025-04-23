import useApis from './api';


export * from './useGetAllBuildings';
export * from './useGetBuildingById';
export * from './useUpdateBuilding';
export * from './useDeleteBuilding';
export * from './useGetRoomById';
export * from './useAddRoom';
export * from './useUpdateRoom';
export * from './useDeleteRoom';
export * from './useGetRoomsByBuilding';
export * from './useCreateBuilding';

// eslint-disable-next-line react-hooks/rules-of-hooks
export const buildingApis = useApis();


