import { Callback } from '@/utils/helpers';
import { ProColumns } from '@ant-design/pro-table';
import { Button, Checkbox, message } from 'antd';
import { PopconfirmProps } from 'antd/lib';
import { StudentResponse } from '@queries/Students/types';

type StudentsProps = {
  handleRemoveStudent: Callback;
};

const confirm: PopconfirmProps['onConfirm'] = (e) => {
  message.success('Click on Yes');
};

const cancel: PopconfirmProps['onCancel'] = (e) => {
  message.error('Click on No');
};

export const studentsAllColumns = ({
  handleRemoveStudent,
}: StudentsProps): ProColumns<StudentResponse>[] => [
  {
    title: 'ID',
    dataIndex: 'id',
    valueType: 'text',
    hidden: true,
  },
  {
    title: 'Name',
    dataIndex: 'firstName' + 'lastName',
    valueType: 'text',
  },
  {
    title: 'ID',
    dataIndex: 'studentId',
    valueType: 'text',
  },
  {
    title: 'Degree Level',
    dataIndex: 'degreeLevel',
    valueType: 'text',
  },
  {
    title: 'Actions',
    key: 'actions',
    valueType: 'option',
    render: (_, record) => [
      <Button key="assign" onClick={() => handleRemoveStudent(record.studentId)}>
        Assign
      </Button>,
    ],
  },
];
