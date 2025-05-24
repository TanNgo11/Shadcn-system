import { List } from 'antd';
import CourseCard from './CourseCard';
import { RegistrationResponse } from '@/queries/Registration/types';

interface CoursesPageProps {
  registrations: RegistrationResponse[];
}

const CoursesPage = ({ registrations }: CoursesPageProps) => {
  return (
    <List
      rowKey={(item) => item.courseCode}
      grid={{ gutter: 24, xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
      dataSource={registrations}
      renderItem={(registration) => (
        <List.Item>
          <CourseCard
            name={registration?.courseDetails?.name || ''}
            description={registration?.baseCourseDetails?.description || ''}
            avatar={registration?.courseDetails?.imageUri || ''}
            studentId={registration?.studentId}
            courseId={registration?.courseDetails?.id}
            courseCode={registration?.baseCourseDetails?.code}
          />
        </List.Item>
      )}
    />
  );
};

export default CoursesPage;
