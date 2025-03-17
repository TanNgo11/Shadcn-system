import { Descriptions, Spin } from 'antd';
import { getProcessedAdminInfo } from './helpers';
import { useProfile } from '../../useProfile';

const AdminInfo = () => {
  const {
    states: { profile: admin, isFetching },
  } = useProfile();
  if (isFetching) return <Spin size="large" />;

  return (
    <Descriptions title="Admin Info" column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}>
      {getProcessedAdminInfo(admin).map(({ label, value }) => (
        <Descriptions.Item key={label} label={label}>
          {value}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
};

export default AdminInfo;
