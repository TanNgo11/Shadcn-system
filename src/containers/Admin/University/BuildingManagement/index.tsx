import {useNotification} from '@/containers/StartupContainers/ToastContainer';
import {useDeleteBuilding, useGetAllBuildings, useUpdateBuilding} from '@/queries/Building';
import {ActionType, ProColumns, ProTable} from '@ant-design/pro-components';
import {Button} from 'antd';
import {useCallback, useEffect, useMemo, useRef} from 'react';
import {useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {allColumns} from './allColumns';
import {BuildingResponse} from '@/queries/Building/types';
import {PlusOutlined} from '@ant-design/icons';
import {Action} from './helpers';
import {buildingApis} from '@/queries/Building';

export default function BuildingManagement() {
	const navigate = useNavigate();
	const toast = useNotification();
	const location = useLocation();
	const actionRef = useRef<ActionType>();

	const {
		buildings,
		setParams,
		handleInvalidateBuildingsList
	} = useGetAllBuildings({
		tableParams: {
			current: 1,
			pageSize: 10,
		},
	});

	const handleEditBuilding = useCallback(
		(id: string | number, action: Action) => {
			if (action === Action.EDIT) {
				navigate(`/admin/buildings/${id}`);
			}
		},
		[navigate],
	);


	const {deleteBuilding} = useDeleteBuilding({
		onSuccess: () => {
			toast.success({
				message: 'Building deleted successfully',
				description: 'The building has been deleted successfully.',
			});
			handleInvalidateBuildingsList({
				current: 1,
				pageSize: 10,
			}).then();
		},
		onError: () => {
			toast.error({
				message: 'Building deletion failed',
				description: 'The building could not be deleted.',
			});
		},
	});

	const handleDeleteBuilding = useCallback(
		async (id: string | number, action: Action) => {
			if (action === Action.DELETE) {
				deleteBuilding(id);
			}
		},
		[deleteBuilding],
	);

	const handleCellClick = useCallback(
		(record: BuildingResponse) => {
			navigate(`/admin/buildings/${record.id}/rooms`);
		},
		[navigate],
	);

	const columns: ProColumns<BuildingResponse>[] = useMemo(
		() =>
			allColumns({
				handleEditBuilding,
				handleDeleteBuilding,
				handleCellClick,
			}),
		[handleEditBuilding, handleDeleteBuilding, handleCellClick],
	);

	return (
		<ProTable<BuildingResponse>
			dataSource={buildings}
			columns={columns}
			actionRef={actionRef}
			cardBordered
			request={async (params, _sort, _filter) => {
				setParams(params);
				return {
					data: buildings,
					success: true,
					total: buildings?.length || 0,
				};
			}}
			columnsState={{
				persistenceKey: 'building-management-table',
				persistenceType: 'localStorage',
				defaultValue: {
					option: {fixed: 'right', disable: true},
				},
			}}
			rowKey="id"
			options={{
				setting: {
					listsHeight: 400,
				},
			}}
			search={{
				layout: 'vertical',
			}}
			form={{
				syncToUrl: (values: Record<string, any>, type: 'get' | 'set') => {
					if (type === 'get') {
						return {
							...values,
							created_at: [values.startTime, values.endTime],
						};
					}
					return values;
				},
			}}
			pagination={{
				pageSize: 10,
				onChange: (page) => {
					setParams({
						current: page,
						pageSize: 10,
					});
				},
			}}
			dateFormatter="string"
			headerTitle="Building Management"
			toolBarRender={() => [
				<Button
					key="button"
					icon={<PlusOutlined/>}
					onClick={() => {
						navigate('/admin/buildings/create');
					}}
					type="primary"
				>
					Add New Building
				</Button>,
			]}
		/>
	);
}