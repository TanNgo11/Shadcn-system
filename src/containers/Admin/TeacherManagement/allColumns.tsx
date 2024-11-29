import { TeacherResponse } from '@/queries/Teachers/types';
import { Callback } from '@/utils/helpers';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ProColumns } from '@ant-design/pro-table';
import { Checkbox } from 'antd';
import { Gender } from '../components/types';
import { Action } from './helpers';

type ListTeachersProps = {
  handleEditTeacher: Callback;
};

export const allColumns = ({
  handleEditTeacher,
}: ListTeachersProps): ProColumns<TeacherResponse>[] => [
  {
    title: '#',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
    render: (_text, record) => (
      <Checkbox
        onChange={(e: { target: { checked: any } }) => console.log(e.target.checked, record)}
      />
    ),
  },
  {
    title: 'ID',
    dataIndex: 'id',
    valueType: 'text',
  },
  {
    title: 'Full Name',
    dataIndex: 'fullName',
    valueType: 'text',
    render: (_text, record) => `${record.firstName} ${record.lastName}`,
  },
  {
    title: 'Teacher ID',
    dataIndex: 'teacherId',
    valueType: 'text',
    render: (_text, record) => record.teacherId ?? 'N/A',
  },
  {
    title: 'Phone',
    dataIndex: 'emergencyContactPhoneNumber',
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
    render: (_: any, { gender }: TeacherResponse) => {
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
  {
    title: 'Username',
    dataIndex: 'username',
    valueType: 'text',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    valueType: 'text',
  },
  {
    title: 'Department ID',
    dataIndex: 'departmentId',
    valueType: 'text',
  },
  {
    title: 'Date of Birth',
    dataIndex: 'dateOfBirth',
    valueType: 'text',
  },
  {
    title: 'Option',
    valueType: 'option',
    key: 'option',

    render: (_text, _record, _) => [
      <a key="editable">
        <EditOutlined onClick={() => handleEditTeacher(_record.id, Action.EDIT)} />
      </a>,
      <a key="delete">
        <DeleteOutlined
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this teacher?')) {
              console.log('Delete teacher');
              console.log(_record.id);
            }
          }}
        />
      </a>,
    ],
  },
];
