import { useGetCourseDetail } from '@queries/Courses/useGetCourseDetail';
import { useParams } from 'react-router-dom';
import './styles.scss';

const LearningMaterialsTab = () => {
  const { courseId } = useParams();
  const { courseDetail } = useGetCourseDetail({ courseId });

  return (
    <div className="learning-materials-tab-container">
      <div className="learning-materials-tab-container__learning">
        <div
          dangerouslySetInnerHTML={{ __html: courseDetail?.learningMaterialsAndOutcomes || '' }}
          style={{ lineHeight: '1.6', fontSize: '16px' }}
        />
      </div>
    </div>
  );
};

export default LearningMaterialsTab;
