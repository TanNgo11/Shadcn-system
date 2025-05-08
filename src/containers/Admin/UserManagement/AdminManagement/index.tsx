import {AdminResponse} from '@/queries/Admins/types';
import {useGetAdminsList} from '@/queries/Admins/useGetAdminsList';
import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {Button} from 'antd';
import {useCallback, useMemo, useRef} from 'react';
import {allColumns} from './allColumns';
import {useNavigate} from 'react-router-dom';

export default function AdminManagement() {
	const navigate = useNavigate();
	const {admins, setParams} = useGetAdminsList({
		defaultParams: {
			current: 1,
			pageSize: 10,
		},
	});

	const handleEditAdmin = useCallback(
		(id: string) => {
			navigate(`/admin/admins/${id}`);
		},
		[navigate],
	);

	const columns: ProColumns<AdminResponse>[] = useMemo(
		() => allColumns({handleViewAdminDetail: handleEditAdmin}),
		[handleEditAdmin],
	);

	const actionRef = useRef<ActionType>();

	return (
		<ProTable<AdminResponse>
			dataSource={admins}
			columns={columns}
			actionRef={actionRef}
			cardBordered
			request={async (_params, _sort, _filter) => {
				return {
					data: admins,
					success: true,
					total: admins.length,
				};
			}}
			search={{
				layout: 'vertical',
			}}
			columnsState={{
				persistenceKey: 'pro-table-single-demos',
				persistenceType: 'localStorage',
				defaultValue: {
					option: {fixed: 'right', disable: true},
					lastName: {show: false},
					phoneNumber: {show: false},
					address: {show: false},
					hireDate: {show: false},
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
			form={{
				syncToUrl: (values, type) => {
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
				// Cường code lỗi
				// showSizeChanger: true,
				// onChange: (current: any, pageSize: any) => {
				//   setParams((prev) => ({
				//     ...prev,
				//     current,
				//     pageSize,
				//   }));
				// },
				pageSize: 8,
				onChange: (page: any) => console.log(page),
			}}
			dateFormatter="string"
			headerTitle="Advanced"
			toolBarRender={() => [
				<Button
					key="button"
					icon={<PlusOutlined/>}
					onClick={() => {
						navigate('/admin/admins/create');
					}}
					type="primary"
				>
					Add New
				</Button>,
			]}
		/>
	);
}
