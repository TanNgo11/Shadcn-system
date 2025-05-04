import {useNotification} from '@/containers/StartupContainers/ToastContainer';
import {useNavigate, useParams} from 'react-router-dom';
import {useCallback, useRef, useState} from 'react';
import {Button, Card, Form, Input, InputNumber, Modal, Popconfirm, Select, Space, Table} from 'antd';
import {ArrowLeftOutlined, DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {RoomResponse, RoomType, RoomUpdateRequest} from '@/queries/Building/types';
import {useDeleteRoom, useGetBuildingById, useGetRoomsByBuilding, useUpdateRoom} from '@/queries/Building';
import {ActionType} from '@ant-design/pro-components';


export default function ViewRoomsBuilding() {
  const {id} = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useNotification();
  const [form] = Form.useForm();
  const actionRef = useRef<ActionType>(); // this is used to reference the action of the table
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRoom, setEditingRoom] = useState<RoomResponse | null>(null);
  const [modalTitle, setModalTitle] = useState('Add New Room');

  const {rooms, setParams, handleInvalidateRoomsList} = useGetRoomsByBuilding(id || '', {
    tableParams: {
      current: 1,
      pageSize: 10,
    },
  });

  const {building} = useGetBuildingById(id || '');
  const handleBack = useCallback(() => {
    navigate('/admin/buildings-management');
  }, [navigate]);


  const showAddModal = () => {
    form.resetFields();
    setEditingRoom(null);
    setModalTitle('Add New Room');
    setIsModalVisible(true);
  };

  const showEditModal = (room: RoomResponse) => {
    form.setFieldsValue(room);
    setEditingRoom(room);
    setModalTitle('Edit Room');
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const {updateRoom} = useUpdateRoom({
    onSuccess: () => {
      setIsModalVisible(false);
      form.resetFields();
      toast.success({
        message: 'Room updated successfully',
        description: 'The room has been updated successfully.',
      });
      handleInvalidateRoomsList(id || '', {
        current: 1,
        pageSize: 10,
      });
    },
    onError: error =>
      toast.error({
        message: 'Update Room',
        description: error.message,
      }),
  });
  const {deleteRoom} = useDeleteRoom();

  const handleEditRoom = async (_roomId: number | string, roomUpdateRequest: RoomUpdateRequest) => {

    try {
      setLoading(true);
      updateRoom({
        request: roomUpdateRequest,
        roomId: _roomId
      });
    } catch (error) { /* empty */
    } finally {
      setLoading(false);
    }
  };


  const handleDeleteRoom = async (roomCodes: string[]) => {
    try {
      setLoading(true);
      deleteRoom(roomCodes);
      toast.success({
        message: 'Room deleted successfully',
        description: 'The room has been deleted successfully.',
      });
      await handleInvalidateRoomsList(id || "", {
        current: 1,
        pageSize: 10,
      });
    } catch (error) {
      toast.error({
        message: 'Delete Room',
        description: 'The room could not be deleted.',
      });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Room Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
    },
    {
      title: 'Room Type',
      dataIndex: 'roomType',
      key: 'roomType',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: RoomResponse) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined/>}
            onClick={() => showEditModal(record)}
            type="link"
          />
          <Popconfirm
            title="Are you sure you want to delete this room?"
            onConfirm={() => handleDeleteRoom([record.code])}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined/>}
              type="link"
              danger
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        icon={<ArrowLeftOutlined/>}
        onClick={() => navigate('/admin/buildings-management')}
        style={{marginBottom: 16}}
      >
        Back to Buildings
      </Button>

      <Card
        title={`Rooms in ${building?.name || 'Building'}`}
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined/>}
            onClick={showAddModal}
          >
            Add Room
          </Button>
        }
        loading={loading && !rooms}
      >
        <Table
          dataSource={rooms}
          columns={columns}
          rowKey="code"
          pagination={{
            pageSize: 10,
            onChange: (page) => {
              setParams({
                current: page,
                pageSize: 10,
              });
            },
          }}
        />
      </Card>

      <Modal
        title={modalTitle}
        open={isModalVisible}
        onOk={() => handleEditRoom(editingRoom?.id || '', form.getFieldsValue())}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="code"
            label="Room Code"
            rules={[{required: true, message: 'Please enter room code'}]}
          >
            <Input placeholder="Enter room code"/>
          </Form.Item>

          <Form.Item
            name="name"
            label="Room Name"
            rules={[{required: true, message: 'Please enter room name'}]}
          >
            <Input placeholder="Enter room name"/>
          </Form.Item>

          <Form.Item
            name="capacity"
            label="Capacity"
            rules={[{required: true, message: 'Please enter capacity'}]}
          >
            <InputNumber min={1} placeholder="Enter capacity" style={{width: '100%'}}/>
          </Form.Item>

          <Form.Item
            name="roomType"
            label="Room Type"
          >
            <Select placeholder="Select room type">
              <Select.Option value={RoomType.CLASSROOM}>Classroom</Select.Option>
              <Select.Option value={RoomType.LABORATORY}>Laboratory</Select.Option>
              <Select.Option value={RoomType.OFFICE}>Office</Select.Option>
              <Select.Option value={RoomType.AUDITORIUM}>Auditorium</Select.Option>
              <Select.Option value={RoomType.CONFERENCE_ROOM}>Conference Room</Select.Option>
              <Select.Option value={RoomType.STUDY_ROOM}>Study Room</Select.Option>
              <Select.Option value={RoomType.OTHER}>Other</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
