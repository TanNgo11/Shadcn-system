import { Callback } from '@/utils/helpers';
import { ProColumns } from '@ant-design/pro-table';
import { TeacherResponse } from '@queries/Teachers/types';
import { Button, message } from 'antd';
import { PopconfirmProps } from 'antd/lib';

type TeachersProps = {
  handleRemoveTeacher: Callback;
};

const confirm: PopconfirmProps['onConfirm'] = (e) => {
  message.success('Click on Yes');
};

const cancel: PopconfirmProps['onCancel'] = (e) => {
  console.log(e);
  message.error('Click on No');
};

export const teachersAllColumns = ({
  handleRemoveTeacher,
}: TeachersProps): ProColumns<TeacherResponse>[] => [
  {
    title: 'ID',
    dataIndex: 'id',
    valueType: 'text',
    hidden: true,
    search: false,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    valueType: 'text',
    render: (_, record) => `${record.firstName} ${record.lastName}`,
  },
  {
    title: 'ID',
    dataIndex: 'entityId',
    valueType: 'text',
  },
  // {
  //   title: 'Department ID',
  //   dataIndex: 'departmentId',
  //   valueType: 'text',
  // },
  {
    title: 'Actions',
    key: 'actions',
    valueType: 'option',
    render: (_, record) => [
      <Button key="assign" onClick={() => handleRemoveTeacher(record.id)}>
        Remove
      </Button>,
    ],
  },
];
