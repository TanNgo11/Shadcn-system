import { PATHS } from '@/containers/Layouts/Components/_AdminSidebarProps';
import { SemesterResponse } from '@/queries/Semester';
import { ProColumns } from '@ant-design/pro-table';
import { Button } from 'antd';

export const allColumns = (): ProColumns<SemesterResponse>[] => [
  {
    title: 'ID',
    dataIndex: 'id',
    valueType: 'text',
    width: 40,
    render: (_, __, index) => index + 1,
  },
  {
    title: 'Semester Name',
    dataIndex: 'name',
    valueType: 'text',
    ellipsis: true,
  },
  {
    title: 'Start Date',
    dataIndex: 'startDate',
    valueType: 'date',
  },
  {
    title: 'End Date',
    dataIndex: 'endDate',
    valueType: 'date',
  },
  {
    title: 'Registration Open',
    dataIndex: 'registrationOpen',
    valueType: 'select',
    valueEnum: {
      true: { text: 'Open', status: 'Success' },
      false: { text: 'Close', status: 'Error' },
    },
  },
  {
    title: 'Semester Status',
    dataIndex: 'semesterActive',
    valueType: 'select',
    valueEnum: {
      true: { text: 'Active', status: 'Success' },
      false: { text: 'Inactive', status: 'Error' },
    },
  },
  // action open course here
  {
    title: 'Action',
    valueType: 'option',
    render: (_, record) =>
      record.registrationOpen && record.semesterActive ? (
        <Button onClick={() => {
          {PATHS.OPEN_COURSE.replace(':id', record.id)}
        }}>Open Courses</Button>
      ) : null,
  },
];
