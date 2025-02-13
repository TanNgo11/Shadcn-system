import { StudentResponse } from '@/queries/Students/types';
import { Callback } from '@/utils/helpers';
import { EditOutlined } from '@ant-design/icons';
import { ProColumns } from '@ant-design/pro-table';
import { Gender } from '../components/types';
import { Action } from './helpers';
import StudentChip from './ChipCommon';

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
    sorter: true, // Enables sorting by this column
  },
  {
    title: 'Full Name',
    valueType: 'text',
    dataIndex: 'fullName',
    render: (_: any, record: { firstName: string; lastName: string }) => (
      <p>{`${record?.firstName ?? ''} ${record?.lastName ?? ''}`}</p>
    ),
  },
  {
    title: 'Student ID',
    dataIndex: 'studentId',
    valueType: 'text',
    sorter: true,
  },
  {
    title: 'Username',
    dataIndex: 'username',
    valueType: 'text',
    sorter: true,
    search: true, // Enables search input in this column
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
    search: true,
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    valueType: 'select', // Dropdown for gender
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
    valueType: 'date', // Enables date input for searching
    sorter: true,
  },
  {
    title: 'Present',
    dataIndex: 'present',
    render: (_, record) => <StudentChip status={record.present} />,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (_, record) => <StudentChip status={record.status} />,
  },
  {
    title: 'Options',
    valueType: 'option',
    key: 'option',
    render: (_text, record) => [
      <a key="editable">
        <EditOutlined onClick={() => handleEditStudent(record.id, Action.EDIT)} />
      </a>,
    ],
  },
];
