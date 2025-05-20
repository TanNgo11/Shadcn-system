import { ProColumns } from '@ant-design/pro-table';
import { TimeSlotResponse } from '@queries/Attendance/types';
import { Button, Popconfirm, Space, Tag } from 'antd';
import { Callback } from '@/utils/helpers';
import ChipCommon from '../ChipCommon';
import { DeleteFilled, DeleteOutlined } from '@ant-design/icons';

type TimeSlotProps = {
  handleDelete: Callback;
  teacherId: string;
};

export const timeSlotsColumns = ({
  handleDelete,
  teacherId,
}: TimeSlotProps): ProColumns<TimeSlotResponse>[] => [
  {
    title: 'No.',
    dataIndex: 'index',
    valueType: 'index',
    width: 48,
    align: 'center',
    render: (_, record, index) => <Tag color="default">{index + 1}</Tag>,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    valueType: 'date',
  },
  {
    title: 'Day of Week',
    dataIndex: 'dayOfWeek',
    valueType: 'text',
    render: (_, record) => <ChipCommon status={record.dayOfWeek} />,
  },
  {
    title: 'Start Time',
    dataIndex: 'startTime',
    valueType: 'time',
    render: (_, record) => <Tag color="geekblue">{record.startTime}</Tag>,
  },
  {
    title: 'End Time',
    dataIndex: 'endTime',
    valueType: 'time',
    render: (_, record) => <Tag color="volcano">{record.endTime}</Tag>,
  },
  {
    title: 'Actions',
    key: 'actions',
    valueType: 'option',
    align: 'center',
    width: 120,
    render: (_, record) => (
      <Space style={{ display: 'flex', justifyContent: 'center' }}>
        {/* You can also add an Edit button here */}
        <Popconfirm
          title="Are you sure to delete this timeslot?"
          onConfirm={() =>
            handleDelete({
              timeSlotId: record.id,
              teacherId: teacherId,
            })
          }
        >
          <DeleteOutlined style={{ color: 'red' }} />
        </Popconfirm>
      </Space>
    ),
  },
];
