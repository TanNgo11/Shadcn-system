import { AdminResponse } from '@/queries/Admins/types';
import { Callback } from '@/utils/helpers';
import { EditOutlined } from '@ant-design/icons';
import { ProColumns } from '@ant-design/pro-table';
import { Checkbox } from 'antd';
import { Gender } from '../../components/types';

type ListAdminsProps = {
  handleViewAdminDetail: Callback;
};

export const allColumns = ({
  handleViewAdminDetail,
}: ListAdminsProps): ProColumns<AdminResponse>[] => [
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
    title: 'Admin ID',
    dataIndex: 'adminId',
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
    render: (_: any, { gender }: AdminResponse) => {
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
    title: 'Hire Date',
    dataIndex: 'hireDate',
    valueType: 'text',
  },
  {
    title: 'Department ID',
    dataIndex: 'departmentId',
    valueType: 'text',
  },
  {
    title: 'Work Schedule',
    dataIndex: 'workSchedule',
    valueType: 'text',
  },
  {
    title: 'D.o.B',
    dataIndex: 'dateOfBirth',
    valueType: 'text',
  },
  {
    title: 'option',
    valueType: 'option',
    key: 'option',

    render: (_text, _record, _) => [
      <a key="editable">
        <EditOutlined onClick={() => handleViewAdminDetail(_record.id)} />
      </a>,
    ],
  },
];
