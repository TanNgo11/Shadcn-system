import CourseTab from '@/containers/Profile/InformationTabs/CourseTab';
import StudentTab from '@/containers/Profile/InformationTabs/StudentTab';
import { DatabaseTwoTone, ProfileTwoTone } from '@ant-design/icons';
import { Tabs } from 'antd';
import { useMemo } from 'react';

const InformationTabs = () => {
  const listTabs = useMemo(() => {
    return [
      {
        key: 'Student Information',
        label: 'Student Information',
        children: <StudentTab />,
        icon: <ProfileTwoTone />,
      },
      {
        key: '2',
        label: 'Course Information',
        children: <CourseTab />,
        icon: <DatabaseTwoTone />,
      },
    ];
  }, []);
  return <Tabs defaultActiveKey="1" items={listTabs} />;
};

export default InformationTabs;
