import { ProColumns } from '@ant-design/pro-table';
import { TeacherResponse } from '@queries/Teachers/types';
import { Tag } from 'antd';

type TeachersProps = {
  //handleOnClickTeacher: Callback;
};

export const teacherColumns = ({}: TeachersProps): ProColumns<TeacherResponse>[] => [
  {
    title: 'ID',
    dataIndex: 'id',
    valueType: 'text',
    width: 40,
    hidden: true,
  },
  {
    title: 'No.',
    valueType: 'index',
    width: 48,
    align: 'center',
    render: (text, record, index) => (
      <Tag color="red" className="text-center">
        {index + 1}
      </Tag>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    valueType: 'text',
    render: (_, record) => (
      <div className="cursor-pointer hover:text-blue-600">
        {record.firstName} {record.middleName ? `${record.middleName} ` : ''}
        {record.lastName}
      </div>
    ),
    align: 'center',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    valueType: 'text',
  },
  {
    title: 'Phone',
    dataIndex: 'phoneNumber',
    render: (_, record) => <Tag color="blue">{record.phoneNumber}</Tag>,
  },
  {
    title: 'Date of Birth',
    dataIndex: 'dateOfBirth',
    valueType: 'text',
    render: (_, record) => (
      <Tag color="green">
        {new Date(record.dateOfBirth).toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })}
      </Tag>
    ),
  },
  // {
  //   title: 'Actions',
  //   valueType: 'option',
  //   render: (_, record) => [
  //     <ActionDialog
  //       key="actions"
  //       actions={getCourseActions(record, handleOnClickTeacher)}
  //     />
  //   ],
  //   width: 80,
  // },
];
