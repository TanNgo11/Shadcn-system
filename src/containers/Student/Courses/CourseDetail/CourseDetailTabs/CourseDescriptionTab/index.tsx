import { useGetCourseDetail } from '@queries/Courses/useGetCourseDetail';
import { useParams } from 'react-router-dom';
import './styles.scss';

const CourseDescriptionTab = () => {
  const { courseId } = useParams();
  const { courseDetail } = useGetCourseDetail({ courseId });

  return (
    <div className="course-description-tab-container">
      <div
        dangerouslySetInnerHTML={{ __html: courseDetail?.courseInformation || '' }}
        style={{ lineHeight: '1.6', fontSize: '16px' }}
      />
    </div>
  );
};

export default CourseDescriptionTab;
