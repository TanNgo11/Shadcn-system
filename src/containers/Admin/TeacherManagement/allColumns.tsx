import { Callback } from '@/utils/helpers';
import { EditOutlined } from '@ant-design/icons';
import { ProColumns } from '@ant-design/pro-table';
import { Checkbox } from 'antd';
import { Gender } from '../components/types';
import { TeacherResponse } from '@/queries/Teacher/types';

type ListTeachersProps = {
  handleViewTeacherDetail: Callback;
};

export const allColumns = ({
  handleViewTeacherDetail,
}: ListTeachersProps): ProColumns<TeacherResponse>[] => [
  {
    title: '#',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
    render: (_text, record) => <Checkbox onChange={(e) => console.log(e.target.checked, record)} />,
  },
  {
    title: 'ID',
    dataIndex: 'id',
    valueType: 'text',
  },
  {
    title: 'Full Name',
    valueType: 'text',
    width: 200,
    render: (_: any, record: { firstName: string; lastName: string }) => (
      <p>{`${record?.firstName ?? ''} ${record?.lastName ?? ''}`}</p>
    ),
  },
  {
    title: 'Teacher ID',
    dataIndex: 'teacherId',
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
    title: 'Citizen ID',
    dataIndex: 'citizenId',
    valueType: 'text',
  },
  {
    title: 'School Year',
    dataIndex: 'schoolYear',
    valueType: 'text',
  },
  {
    title: 'Username',
    dataIndex: 'userName',
    valueType: 'text',
  },
  {
    title: 'Present',
    dataIndex: 'present',
    valueType: 'text',
  },
  {
    title: 'option',
    valueType: 'option',
    key: 'option',

    render: (_text, _record, _) => [
      <a key="editable">
        <EditOutlined onClick={() => handleViewTeacherDetail(_record.id)} />
      </a>,
    ],
  },
];
