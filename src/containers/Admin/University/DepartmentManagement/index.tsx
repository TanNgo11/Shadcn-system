import {useNotification} from '@/containers/StartupContainers/ToastContainer';
import {useGetDepartmentList} from '@/queries/Departments/useGetDepartmentList';
import {ActionType, ProColumns, ProTable} from '@ant-design/pro-components';
import {Button} from 'antd';
import {useCallback, useMemo, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {allColumns} from './allColumns';
import {DepartmentResponse} from '@/queries/Departments/types';
import {PlusOutlined} from '@ant-design/icons';
import {Action} from './helpers';

export default function HomePage() {
	const navigate = useNavigate();
	const toast = useNotification();
	const actionRef = useRef<ActionType>();
	const {handleInvalidateDepartmentList} = useGetDepartmentList({
		defaultParams: {
			current: 1,
			pageSize: 10,
		},
	});

	const {departments} = useGetDepartmentList({
		defaultParams: {
			current: 1,
			pageSize: 10,
		},
	});

	const handleEditDepartment = useCallback(
		(id: string, action: Action) => {
			if (action === Action.EDIT) {
				navigate(`/admin/departments/${id}`);
			}
		},
		[navigate],
	);

	const handleDeleteDepartment = useCallback((_id: string, action: Action) => {
		if (action === Action.DELETE) {
			// onDeleteDepartmentById(id);
		}
	}, []);

	const handleCellClick = useCallback(
		(record: DepartmentResponse) => {
			navigate(`/admin/departments-management/${record.id}/courses`);
		},
		[navigate],
	);

	const columns: ProColumns<DepartmentResponse>[] = useMemo(
		() =>
			allColumns({
				handleEditDepartment,
				handleDeleteDepartment,
				handleCellClick,
			}),
		[handleEditDepartment, handleDeleteDepartment, handleCellClick],
	);

	return (
		<ProTable<DepartmentResponse>
			dataSource={departments}
			columns={columns}
			actionRef={actionRef}
			cardBordered
			request={async (_params, _sort, _filter) => {
				return {
					data: departments,
					success: true,
					total: departments.length,
				};
			}}
			columnsState={{
				persistenceKey: 'pro-table-single-demos',
				persistenceType: 'localStorage',
				defaultValue: {
					option: {fixed: 'right', disable: true},
					startYear: {show: true},
					endYear: {show: true},
				},
				onChange(value) {
					console.log('value: ', value);
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
			}}
			dateFormatter="string"
			headerTitle="Advanced"
			toolBarRender={() => [
				<Button
					key="button"
					icon={<PlusOutlined/>}
					onClick={() => {
						navigate('/admin/department/create');
					}}
					type="primary"
				>
					Add New
				</Button>,
			]}
		/>
	);
}
