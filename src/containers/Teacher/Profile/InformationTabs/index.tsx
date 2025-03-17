import { DatabaseTwoTone, ProfileTwoTone } from '@ant-design/icons';
import { useGetProfileByUserId } from '@queries/Auth/useGetProfileByUserId';
import { TeacherResponse } from '@queries/Teachers/types';
import { Tabs } from 'antd';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import CourseTab from './CourseTab';
import TeacherTab from './TeacherTab';

const InformationTabs = () => {
  const { userId } = useParams();
  const { profile } = useGetProfileByUserId<TeacherResponse>({ id: String(userId) });
  const listTabs = useMemo(() => {
    return [
      {
        key: 'Teacher Information',
        label: 'Teacher Information',
        children: <TeacherTab teacherProfile={profile} />,
        icon: <ProfileTwoTone />,
      },
      {
        key: '2',
        label: 'Course Information',
        children: <CourseTab teacherProfile={profile} />,
        icon: <DatabaseTwoTone />,
      },
    ];
  }, [profile]);
  return <Tabs defaultActiveKey="1" items={listTabs} />;
};

export default InformationTabs;
