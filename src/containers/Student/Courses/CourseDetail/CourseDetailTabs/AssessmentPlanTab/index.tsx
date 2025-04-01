import { useGetCourseDetail } from '@queries/Courses/useGetCourseDetail';
import { useParams } from 'react-router-dom';

const AssessmentPlanTab = () => {
  const { courseId } = useParams();
  const { courseDetail } = useGetCourseDetail({ courseId });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: courseDetail?.assessmentPlan || '' }}
      style={{ lineHeight: '1.6', fontSize: '16px' }}
    />
  );
};

export default AssessmentPlanTab;
