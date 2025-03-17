import CourseTab from '@/containers/Student/Profile/InformationTabs/CourseTab';
import StudentTab from '@/containers/Student/Profile/InformationTabs/StudentTab';
import { DatabaseTwoTone, ProfileTwoTone } from '@ant-design/icons';
import { useGetProfileByUserId } from '@queries/Auth/useGetProfileByUserId';
import { StudentProfileResponse } from '@queries/Students/types';
import { Tabs } from 'antd';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

const InformationTabs = () => {
  const { userId } = useParams();
  const userProfile = useGetProfileByUserId<StudentProfileResponse>({ id: String(userId) });
  const listTabs = useMemo(() => {
    return [
      {
        key: 'Student Information',
        label: 'Student Information',
        children: <StudentTab {...userProfile} />,
        icon: <ProfileTwoTone />,
      },
      {
        key: '2',
        label: 'Course Information',
        children: <CourseTab  {...userProfile} />,
        icon: <DatabaseTwoTone />,
      },
    ];
  }, [userProfile]);
  return <Tabs defaultActiveKey="1" items={listTabs} />;
};

export default InformationTabs;
