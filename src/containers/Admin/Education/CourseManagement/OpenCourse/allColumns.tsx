import { SemesterResponse } from '@/queries/Semester';
import { ProColumns } from '@ant-design/pro-table';

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
    title: 'Status',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: {
      ACTIVE: { text: 'Active', status: 'Success' },
      INACTIVE: { text: 'Inactive', status: 'Error' },
    },
  },
];
