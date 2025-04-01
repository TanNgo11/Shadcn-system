import { ProfileOutlined } from '@ant-design/icons';
import { GrPlan } from 'react-icons/gr';
import { IoIosDocument } from 'react-icons/io';
import { MdAssignment } from 'react-icons/md';
import { RiFunctionFill } from 'react-icons/ri';
import ActivitiesTab from './ActivitiesTab';
import AssessmentPlanTab from './AssessmentPlanTab';
import CourseDescriptionTab from './CourseDescriptionTab';
import LearningMaterialsTab from './LearningMaterialsTab';
import LessonsTab from './LessonsTab';

export const listTabs = [
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
