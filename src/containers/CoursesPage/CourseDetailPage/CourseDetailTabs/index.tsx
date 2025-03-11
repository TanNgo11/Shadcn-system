import { ProfileOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { useMemo } from 'react';
import { GrPlan } from 'react-icons/gr';
import { IoIosDocument } from 'react-icons/io';
import { RiFunctionFill } from 'react-icons/ri';
import ActivitiesTab from './ActivitiesTab';
import AssessmentPlanTab from './AssessmentPlanTab';
import CourseDescriptionTab from './CourseDescriptionTab';
import LearningMaterialsTab from './LearningMaterialsTab';
import LessonsTab from './LessonsTab';
import { MdAssignment } from 'react-icons/md';
import { useCourseStore } from '@/hooks/useCourseStore';

const CourseDetailTabs = () => {
  const courseDetails = useCourseStore((state) => state.courseDetail);

  const listTabs = useMemo(() => {
    return [
      {
        key: 'Course',
        label: 'Course ',
        children: <CourseDescriptionTab />,
        icon: <ProfileOutlined />,
      },
      {
        key: 'AssessmentPlan',
        label: 'Assessment Plan',
        children: <AssessmentPlanTab />,
        icon: <GrPlan />,
      },
      {
        key: 'LearningMaterials',
        label: 'Learning Materials ',
        children: <LearningMaterialsTab />,
        icon: <IoIosDocument />,
      },
      {
        key: 'Activities',
        label: 'Activities',
        children: <ActivitiesTab />,
        icon: <RiFunctionFill />,
      },
      {
        key: 'Lessons',
        label: 'Lessons',
        children: <LessonsTab />,
        icon: <MdAssignment />,
      },
    ];
  }, []);
  return <Tabs defaultActiveKey="1" items={listTabs} />;
};

export default CourseDetailTabs;
