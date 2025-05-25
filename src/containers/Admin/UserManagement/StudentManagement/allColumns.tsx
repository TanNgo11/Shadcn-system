import { StudentResponse } from '@/queries/Students/types';
import { Callback } from '@/utils/helpers';
import { EditOutlined } from '@ant-design/icons';
import { ProColumns } from '@ant-design/pro-table';
import { Button } from 'antd/lib';
import StudentChip from './ChipCommon';
import { Action } from './helpers';

type ListStudentsProps = {
  handleEditStudent: Callback;
};

export const allColumns = ({
  handleEditStudent,
}: ListStudentsProps): ProColumns<StudentResponse>[] => [
  {
    title: 'ID',
    dataIndex: 'id',
    valueType: 'text',
    width: 40,
    sorter: true, // Enables sorting by this column
  },
  {
    title: 'Full Name',
    valueType: 'text',
    dataIndex: 'fullName',
    render: (_, record: { firstName: string; lastName: string }) => (
      <p>{`${record?.firstName ?? ''} ${record?.lastName ?? ''}`}</p>
    ),
  },
  {
    title: 'Student ID',
    dataIndex: 'studentId',
    valueType: 'text',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    valueType: 'text',
    sorter: true,
    search: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    valueType: 'text',
    sorter: true,
    search: true,
  },
  {
    title: 'Phone',
    dataIndex: 'phoneNumber',
    valueType: 'text',
    search: true,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    valueType: 'text',
    ellipsis: true,
    search: true,
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    valueType: 'select',
    valueEnum: {
      MALE: { text: 'Male' },
      FEMALE: { text: 'Female' },
      OTHER: { text: 'Others' },
    },
  },
  {
    title: 'Academic Year',
    dataIndex: 'academicYearId',
    valueType: 'text',
    sorter: true,
  },
  {
    title: 'Date of Birth',
    dataIndex: 'dateOfBirth',
    valueType: 'date',
    sorter: true,
  },
  {
    title: 'Present',
    dataIndex: 'present',
    render: (_, record) => <StudentChip status={record.present} />,
  },
  // {
  //   title: 'Status',
  //   dataIndex: 'status',
  //   render: (_, record) => <StudentChip status={record.status} />,
  // },
  {
    title: 'Options',
    valueType: 'option',
    key: 'option',
    width: 80,
    fixed: 'right',
    render: (_text, record) => [
      <Button variant="solid" key="editable">
        <EditOutlined onClick={() => handleEditStudent(record.id, Action.EDIT)} />
      </Button>,
    ],
  },
];
