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
  },
  {
    title: 'Full Name',
    valueType: 'text',
    render: (_: any, record: { firstName: string; lastName: string }) => (
      <p>{`${record?.firstName ?? ''} ${record?.lastName ?? ''}`}</p>
    ),
  },
  {
    title: 'Student ID',
    dataIndex: 'studentId',
    valueType: 'text',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    valueType: 'text',
  },
  {
    title: 'Phone',
    dataIndex: 'phoneNumber',
    valueType: 'text',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    valueType: 'text',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    valueType: 'text',
    render: (_: any, { gender }: StudentResponse) => {
      const normalizedGender = gender?.toLowerCase();
      return (
        <p>
          {normalizedGender === Gender.MALE.toLowerCase()
            ? 'Male'
            : normalizedGender === Gender.FEMALE.toLowerCase()
              ? 'Female'
              : 'Others'}
        </p>
      );
    },
  },
  // {
  //   title: 'Citizen ID',
  //   dataIndex: 'citizenId',
  //   valueType: 'text',
  // },
  {
    title: 'Academic Year',
    dataIndex: 'academicYearId',
    valueType: 'text',
  },
  {
    title: 'Date of Birth',
    dataIndex: 'dateOfBirth',
    valueType: 'text',
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
    title: 'option',
    valueType: 'option',
    key: 'option',

    render: (_text, record, _) => [
      <a key="editable">
        <EditOutlined onClick={() => handleEditStudent(record.id, Action.EDIT)} />
      </a>,
    ],
  },
];
