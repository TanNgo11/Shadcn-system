import {useNavigate, useParams} from 'react-router-dom';
import {useCallback, useEffect, useState} from 'react';
import {Button, Card, Form, Input, InputNumber, message, Spin} from 'antd';
import {BuildingCreationRequest, BuildingResponse, BuildingUpdateRequest} from '@/queries/Building/types';
import {
	buildingApis,
	useCreateBuilding,
	useGetAllBuildings,
	useGetBuildingById,
	useUpdateBuilding
} from '@/queries/Building';
import {useNotification} from "@/containers/StartupContainers";

type FormValues = BuildingCreationRequest | BuildingUpdateRequest;

export default function CreateEditViewBuilding() {
	const {id} = useParams<{ id: string }>();
	const navigate = useNavigate();
	const toast = useNotification();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const isEditMode = !!id && id !== 'create';

	const {building} = useGetBuildingById(id || '');
	const {handleInvalidateBuildingsList} = useGetAllBuildings();
	const {updateBuilding} = useUpdateBuilding({
		onSuccess: () => {
			toast.success({
				message: 'Building updated successfully',
				description: 'The building has been updated successfully.',
			});
		},
		onError: () => {
			toast.error({
				message: 'Building update failed',
				description: 'The building could not be updated.',
			});
		},
	});
	const {createBuilding} = useCreateBuilding(
		{
			onSuccess: () => {
				toast.success({
					message: 'Building created successfully',
					description: 'The building has been created successfully.',
				});
				handleInvalidateBuildingsList({
					current: 1,
					pageSize: 10,
				}).then();
			},
			onError: () => {
				toast.error({
					message: 'Building creation failed',
					description: 'The building could not be created.',
				});
			}
		}
	);

	const handleSubmit = async (values: FormValues) => {
		setLoading(true);
		if (isEditMode) {
			const buildingUpdateRequest: BuildingUpdateRequest = {
				...values,
			};
			updateBuilding({
				request: buildingUpdateRequest,
				id: id || '',
			});
		} else {
			createBuilding(values as BuildingCreationRequest);
		}
		navigate('/admin/buildings-management');
	};

	return (
		<Card title={isEditMode ? 'Edit Building' : 'Create Building'}>
			<Spin spinning={loading}>
				<Form
					form={form}
					layout="vertical"
					onFinish={handleSubmit}
					initialValues={building || {}}
				>
					<Form.Item
						name="code"
						label="Building Code"
						rules={[{required: true, message: 'Please enter building code'}]}
					>
						<Input placeholder="Enter building code"/>
					</Form.Item>

					<Form.Item
						name="name"
						label="Building Name"
						rules={[{required: true, message: 'Please enter building name'}]}
					>
						<Input placeholder="Enter building name"/>
					</Form.Item>

					<Form.Item
						name="defaultNumberOfRooms"
						label="Default Number of Rooms"
						rules={[{required: true, message: 'Please enter default number of rooms'}]}
					>
						<InputNumber min={1} placeholder="Enter default number of rooms" style={{width: '100%'}}/>
					</Form.Item>

					<Form.Item
						name="defaultCapacityOfRooms"
						label="Default Capacity of Rooms"
						rules={[{required: true, message: 'Please enter default capacity of rooms'}]}
					>
						<InputNumber min={1} placeholder="Enter default capacity of rooms" style={{width: '100%'}}/>
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit">
							{isEditMode ? 'Update' : 'Create'}
						</Button>
						<Button
							style={{marginLeft: 8}}
							onClick={() => navigate('/admin/buildings-management')}
						>
							Cancel
						</Button>
					</Form.Item>
				</Form>
			</Spin>
		</Card>
	);
}
