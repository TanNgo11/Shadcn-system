import { ProfileTwoTone } from '@ant-design/icons';
import { Tabs } from 'antd';
import { useMemo } from 'react';
import AdminInfo from './AdminTab';

const InformationTabs = () => {
  const listTabs = useMemo(() => {
    return [
      {
        key: 'Student Information',
        label: 'Student Information',
        children: <AdminInfo />,
        icon: <ProfileTwoTone />,
      },
    ];
  }, []);
  return <Tabs defaultActiveKey="1" items={listTabs} />;
};

export default InformationTabs;
