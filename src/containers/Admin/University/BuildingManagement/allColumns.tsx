import {Callback} from '@/utils/helpers';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {ProColumns} from '@ant-design/pro-table';
import {Checkbox, message, Popconfirm} from 'antd';
import {BuildingResponse} from '@/queries/Building/types';

type BuildingsProps = {
	handleEditBuilding: Callback;
	handleDeleteBuilding: Callback;
	handleCellClick: Callback;
};
// Notification box to confirm the deletion of a Building
// const confirm: PopconfirmProps['onConfirm'] = (e) => {
// 	message.success('Click on Yes');
// };
//
// const cancel: PopconfirmProps['onCancel'] = (e) => {
// 	message.error('Click on No');
// };

export const allColumns = ({
       handleEditBuilding,
       handleDeleteBuilding,
       handleCellClick,
   }: BuildingsProps): ProColumns<BuildingResponse>[] => [
	{
		title: '#',
		dataIndex: 'index',
		valueType: 'indexBorder',
		width: 48,
		render: (_text, record: BuildingResponse) => (
			<Checkbox
				onChange={(e: { target: { checked: any } }) => console.log(e.target.checked, record)}
			/>
		),
	},
	{
		title: 'Code',
		dataIndex: 'code',
		valueType: 'text',
	},
	{
		title: 'Building Name',
		dataIndex: 'name',
		valueType: 'text',
		onCell: (_record) => {
			return {
				onClick: () => {
					handleCellClick(_record);
				},
			};
		},
	},
	{
		title: 'Rooms',
		dataIndex: 'rooms',
		valueType: 'text',
		render: (_text, record: BuildingResponse) => {
			return record.rooms?.length || 0;
		},
	},
	{
		title: 'Option',
		valueType: 'option',
		key: 'option',
		render: (_text, _record, _) => [
			<a key="editable" hidden={true}>
				<EditOutlined onClick={() => handleEditBuilding(_record.id, 'edit')}/>
			</a>,
			<a key="delete">
				<Popconfirm
					title="Are you sure to delete this Building?"
					onConfirm={() => handleDeleteBuilding(_record.id, 'delete')}
					// onCancel={cancel}
					okText="Yes"
					cancelText="No"
				>
					<DeleteOutlined/>
				</Popconfirm>
			</a>,
		],
	},
];