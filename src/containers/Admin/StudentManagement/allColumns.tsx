import { StudentResponse } from '@/queries/Students/types';
import { Callback } from '@/utils/helpers';
import { EditOutlined } from '@ant-design/icons';
import { ProColumns } from '@ant-design/pro-table';
import { Checkbox } from 'antd';

type ListStudentsProps = {
  handleViewStudentDetail: Callback;
};

export const allColumns = ({
  handleViewStudentDetail,
}: ListStudentsProps): ProColumns<StudentResponse>[] => [
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
    title: 'First Name',
    dataIndex: 'firstName',
    valueType: 'text',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    valueType: 'text',
  },
  {
    title: 'Student ID',
    dataIndex: 'studentId',
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
    dataIndex: 'username',
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
        <EditOutlined onClick={() => handleViewStudentDetail(_record.id)} />
      </a>,
    ],
  },
];
