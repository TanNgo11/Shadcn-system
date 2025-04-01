import { useParams } from 'react-router-dom';
import { useGetCourseDetail as useGetCourseDetailQuery } from '@/queries/Courses/useGetCourseDetail';

const useGetCourseDetail = () => {
  const { courseId } = useParams();
  const { courseDetail, handleInvalidateTeachersList } = useGetCourseDetailQuery({
    courseId: courseId,
  });

  const teacherInformation = courseDetail?.teacher;

  const courseTitle = courseDetail?.name;

  return {
    states: { courseDetail, teacherInformation, courseTitle },
    handlers: { handleInvalidateTeachersList },
  };
};
export default useGetCourseDetail;
