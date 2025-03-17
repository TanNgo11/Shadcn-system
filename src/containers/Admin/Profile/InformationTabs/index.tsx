import { ProfileTwoTone } from '@ant-design/icons';
import { Tabs } from 'antd';
import { useMemo } from 'react';
import AdminInfo from './AdminTab';
import { AdminResponse } from '@queries/Admins/types';

const InformationTabs = () => {
  const listTabs = useMemo(() => {
    return [
      {
        key: 'Admin Information',
        label: 'Admin Information',
        children: <AdminInfo />,
        icon: <ProfileTwoTone />,
      },
    ];
  }, []);
  return <Tabs defaultActiveKey="1" items={listTabs} />;
};


export default InformationTabs;
