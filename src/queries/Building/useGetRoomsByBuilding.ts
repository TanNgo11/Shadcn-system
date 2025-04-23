import {useState} from 'react';
import {useQuery, useQueryClient, UseQueryOptions} from 'react-query';
import {PaginationResponseType, TableParams, ApiResponseType, responseWrapper} from '../helpers';
import {API_BUILDING_QUERIES} from './keys';
import {RoomResponse} from './types';
import {isEmpty} from '@/utils';
import {buildingApis} from "@/queries";

export function useGetRoomsByBuilding(
	buildingId: string | number,
	options?: UseQueryOptions<
		ApiResponseType<PaginationResponseType<RoomResponse[]>>,
		Error
	> & {
		tableParams?: TableParams;
	},
) {
	const [params, setParams] = useState<TableParams>(options?.tableParams || {});
	const {
		data,
		error,
		isFetching,
		refetch: onGetRoomsByBuilding,
	} = useQuery<ApiResponseType<PaginationResponseType<RoomResponse[]>>, Error>(
		[API_BUILDING_QUERIES.GET_ROOMS_BY_BUILDING, buildingId, {...params}],

		async ({queryKey}) => {
			const [, buildingId, ...params] = queryKey;
			return responseWrapper<ApiResponseType<PaginationResponseType<RoomResponse[]>>>(
				buildingApis.getListRoomByBuilding,
				[buildingId, ...params],
			);
		},
		{
			notifyOnChangeProps: ['data', 'isFetching'],
			keepPreviousData: true,
			enabled: !!buildingId && !isEmpty(params),
			...options,
		},
	);
	const queryClient = useQueryClient();

	const handleInvalidateRoomsList = (buildingId: string | number, params: TableParams) =>
		queryClient.invalidateQueries([API_BUILDING_QUERIES.GET_ROOMS_BY_BUILDING, buildingId, {...params}]);

	const {result: {totalPages, pageSize, totalElements, data: rooms} = {}} = data || {};

	return {
		totalElements,
		pageSize,
		totalPages,
		rooms,
		error,
		isFetching,
		onGetRoomsByBuilding,
		setParams,
		handleInvalidateRoomsList,
	};
}