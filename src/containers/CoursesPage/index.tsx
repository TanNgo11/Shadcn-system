import { List } from 'antd';
import mockData from './mockData';
import CourseCard from './CourseCard';
import { useGetStudentRegistrations } from '@/queries/Courses';
import { useEffect } from 'react';
import { useAuthStore } from '@/zustand/auth/useAuthStore';

const CoursesPage = () => {
  const { setParams, registrations } = useGetStudentRegistrations();
  const { user } = useAuthStore();

  useEffect(() => {
    setParams({ studentId: user?.studentId, pageSize: 999 });
  }, [])

  return (
    <List
      rowKey="courseCode"
      grid={{ gutter: 24, xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
      dataSource={registrations}
      renderItem={(item) => (
        <List.Item>
          <CourseCard quarter={item.semesterName} title={item.courseName} description={item.courseDescription} avatar={item.thumbnail} />
        </List.Item>
      )}
    />
  );
};

export default CoursesPage;
