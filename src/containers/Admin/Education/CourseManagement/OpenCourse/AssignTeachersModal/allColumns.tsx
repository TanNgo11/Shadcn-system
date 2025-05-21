import { Callback } from '@/utils/helpers';
import { ProColumns } from '@ant-design/pro-table';
import { Button, Checkbox, message, Tag } from 'antd';
import { PopconfirmProps } from 'antd/lib';
import { BaseCourseResponse } from '../../helpers';
import { TeacherResponse } from '@queries/Teachers/types';
import { useParams } from 'react-router-dom';
import { TeacherRole } from '@queries/Registration/types';

type TeachersProps = {
  handleAssignTeacher: Callback;
  handleRemoveTeacher: Callback;
};

const confirm: PopconfirmProps['onConfirm'] = (e) => {
  message.success('Click on Yes');
};

const cancel: PopconfirmProps['onCancel'] = (e) => {
  console.log(e);
  message.error('Click on No');
};

export const allColumns = ({
  handleAssignTeacher,
  handleRemoveTeacher,
}: TeachersProps): ProColumns<TeacherResponse>[] => [
  {
    title: 'ID',
    dataIndex: 'id',
    valueType: 'text',
    hidden: true,
  },
  {
    title: 'No.',
    valueType: 'index',
    width: 48,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    valueType: 'text',
    render: (_, record) => `${record.firstName} ${record.lastName}`,
  },
  {
    title: 'ID',
    dataIndex: 'teacherId',
    valueType: 'text',
    render: (_, record) => <Tag color="blue">{record.teacherId}</Tag>,
  },
  {
    title: 'Department ID',
    dataIndex: 'departmentId',
    valueType: 'text',
  },
  {
    title: 'Actions',
    key: 'actions',
    valueType: 'option',
    render: (_, record) => [
      <Button
        key="assign"
        onClick={() => handleAssignTeacher(record, TeacherRole.THEORY_TEACHER)}
        style={{ color: 'green' }}
      >
        Theory
      </Button>,
      <Button
        key="assign"
        onClick={() => handleAssignTeacher(record, TeacherRole.PRACTICE_TEACHER)}
        style={{ color: 'blue' }}
      >
        Practice
      </Button>,
    ],
  },
];
