import { List } from 'antd';
import mockData from './mockData';
import CourseCard from './CourseCard';

const CoursesPage = () => {
  return (
    <List
      rowKey="id"
      grid={{ gutter: 24, xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
      dataSource={mockData}
      renderItem={(item) => (
        <List.Item>
          <CourseCard title={item.title} description={item.description} avatar={item.avatar} />
        </List.Item>
      )}
    />
  );
};

export default CoursesPage;
