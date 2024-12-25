import useApi from '@/queries/Admins/api';
import { useGetCurrentAdminInfo } from '@/queries/Admins/useGetCurrentAdminInfo';
import { Callback } from '@/utils/helpers';
import { Descriptions } from 'antd';

const AdminInfo = () => {
  const { admin } = useGetCurrentAdminInfo({
    enabled: true,
  });

  return (
    <Descriptions
      title="Admin Info"
      column={{
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 2,
      }}
    >
      <Descriptions.Item label="UserName">{admin?.username}</Descriptions.Item>
      <Descriptions.Item label="Telephone">{admin?.phoneNumber}</Descriptions.Item>
      <Descriptions.Item label="Live">{admin?.address}</Descriptions.Item>
      <Descriptions.Item label="Address">{admin?.address}</Descriptions.Item>
      <Descriptions.Item label="Admin ID">{admin?.id}</Descriptions.Item>
      <Descriptions.Item label="Phone Number">{admin?.phoneNumber}</Descriptions.Item>
      <Descriptions.Item label="ID Number">{admin?.adminId}</Descriptions.Item>
      <Descriptions.Item label="Gender">{admin?.gender}</Descriptions.Item>
      <Descriptions.Item label="Date of Birth">{admin?.dateOfBirth}</Descriptions.Item>
      <Descriptions.Item label="Email">{admin?.email}</Descriptions.Item>
      <Descriptions.Item label="Nationality">Vietnam</Descriptions.Item>
      <Descriptions.Item label="Department">{admin?.departmentId}</Descriptions.Item>
      <Descriptions.Item label="Hired Date">{admin?.hireDate}</Descriptions.Item>
    </Descriptions>
  );
};

export default AdminInfo;
