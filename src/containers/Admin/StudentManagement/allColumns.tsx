import { StudentResponse } from '@/queries/Students/types';
import { ProColumns } from '@ant-design/pro-table';

export const allColumns: ProColumns<StudentResponse>[] = [
  {
    title: '#',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'ID',
    dataIndex: 'id',
    valueType: 'text',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    valueType: 'text',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    valueType: 'text',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    valueType: 'text',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    valueType: 'text',
  },
];
