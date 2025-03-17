import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ProColumns } from '@ant-design/pro-table';
import { RegistrationResponse } from '@queries/Registration/types';
import { Checkbox, Popconfirm, PopconfirmProps, message } from 'antd';

// Notification box to confirm the deletion of a course
const cancel: PopconfirmProps['onCancel'] = () => {
  message.error('Click on No');
};

export const allColumns = (): ProColumns<RegistrationResponse>[] => [
  {
    title: 'No.',
    dataIndex: 'index',
    valueType: 'index',
    width: 48,
  },
  {
    title: 'Student ID',
    dataIndex: 'studentId',
    valueType: 'text',
  },
  {
    title: 'Course Code',
    dataIndex: 'courseCode',
    valueType: 'text',
    onCell: () => {
      return {
        onClick: () => {
          window.confirm('Cell clicked ');
        },
      };
    },
  },
  {
    title: 'Semester',
    dataIndex: 'semesterName',
    valueType: 'text',
  },
  {
    title: 'Registration Date',
    dataIndex: 'registrationDate',
    valueType: 'date',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    valueType: 'text',
  },
];
