import { TeacherResponse } from '@/queries/Teachers/types';
import { Callback } from '@/utils/helpers';
import { EditOutlined } from '@ant-design/icons';
import { ProColumns } from '@ant-design/pro-table';
import { Checkbox } from 'antd';

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
    title: 'Teacher ID',
    dataIndex: 'teacherId',
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
    title: 'Option',
    valueType: 'option',
    key: 'option',

    render: (_text, _record, _) => [
      <a key="editable">
        <EditOutlined onClick={() => handleViewTeacherDetail(_record.id)} />
      </a>,
    ],
  },
];
